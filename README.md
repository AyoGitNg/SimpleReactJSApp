React Challenge

## Background

This repo presents a base version of the Administrative UI for managing Gaming Machines remotely from the a SaaS Platform through individual machine's settings.

## Challenge

Update the Administrative Interface to render a list of all machines, along with the ability to view an individual machine's details. Each machine receives real-time updates from a web socket, which need to be reflected in the UI.

To get started, run `npm run server` to start the backend server, and `npm start` to start Webpack.

The backend API is accessible from `http://localhost:8080` and exposes two endpoints:

- GET `/machines` - get all machines
- GET `/machines/:machineId` - get a machine by its ID
- PUT `/machine/:machineId` - update a machine

The web socket url is `ws://localhost:1337`.

1. Add a new reducer to the existing store for the machines
   - Each machine will have the following data:
     - `name`
     - `ip_address`
     - `health`
2. Render a list of machines on the `/machines` route
   - Use data from the machines reducer to render a list view of the machines
   - Each machine list item will render the following data:
     - Name
     - IP Address
     - Health
   - Subscribe to updates from the web socket to get the latest `health` for each machine.
   - Clicking the list item for a machine will navigate to `/machines/:machineId`
3. Render a view for a machine on the `/machines/:machineId` route
   - Show the following data:
     - Name
     - IP Address
     - Health
   - Subscribe to updates from the web socket to get the latest health for the machine.
   - Allow for the "Name" of the machine to be updated.

* Each Component should have a test
* Enhance the existing Redux implementation to manage the new state being introduced for this challenge
* Call a REST API to store the changes made back to the SaaS Platform for use by the Machines
