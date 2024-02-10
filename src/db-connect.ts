import { DataSource } from 'typeorm';
import { PostgresDriver } from 'typeorm/driver/postgres/PostgresDriver';
import { Pool } from 'pg';

import { sleep } from './libs/sleep';
import { OrmConfig } from './libs/typeorm/ormconfig';
import { IS_TEST } from './config';

// Handles unstable/intermitten connection lost to DB
function connectionGuard(connection: DataSource) {
    // Access underlying pg driver
    if (connection.driver instanceof PostgresDriver) {
        const pool = connection.driver.master as Pool;

        // Add handler on pool error event
        pool.on('error', async (err: any) => {
            console.error(`Connection pool erring out due to ${err}, Reconnecting...`);
            try {
                await connection.destroy();
            } catch (innerErr) {
                console.error(`Failed to close connection`);
            }
            while (!connection.isInitialized) {
                try {
                    await connection.initialize(); // eslint-disable-line
                    console.log(`Reconnected to the DB`);
                } catch (error) {
                    console.error(`Reconnection error due to ${error}`);
                }

                if (!connection.isInitialized) {
                    // Throttle retry
                    await sleep(500); // eslint-disable-line
                }
            }
        });
    }
}

// 1. Wait for db to come online and connect
// 2. On connection instability, able to reconnect
// 3. The app should never die due to connection issue
// 3.a. We rethrow the connection error in test mode to prevent open handles issue in Jest
export async function connect(): Promise<DataSource | undefined> {
    let connection: DataSource | undefined;
    let isConnected = false;

    console.log(`Connecting to DB...`);
    while (!isConnected) {
        try {
            const dataSource = new DataSource(OrmConfig);
            connection = await dataSource.initialize();
            isConnected = connection.isInitialized;
        } catch (error) {
            console.error(`createConnection error ${error}`);

            if (IS_TEST) {
                throw error;
            }
        }

        if (!isConnected) {
            // Throttle retry
            await sleep(500); // eslint-disable-line
        }
    }

    console.log(`Connected to the DB`);
    if (connection) {
        connectionGuard(connection);
    }

    return connection;
}
