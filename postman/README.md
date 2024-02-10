## How to run

1. Import the postman [collection](./dating-app-like.postman_collection.json) and [environment](./dating-app-like.postman_environment) to your postman.
2. Run the app as mentioned in [here](../README.md#running-locally).
3. Double check if postman's base URL is already pointing to the actual app's base URL.
4. Run the collection.

## Notes

-   We're using random generators for certain fields, so while it's highly unlikely, there might be collisions or validation errors (especially for passwords). If you encounter such issues, feel free to use your own values.
-   This collection includes only "semi-stateless" APIs. Please note that APIs requiring information from previous responses, such as verification and auth-related APIs, are not covered here. Refer to the documentation provided in [this section](../README.md#api-routes) and the actual [Open API spec](../docs/openapi.yaml) for details on those APIs.
