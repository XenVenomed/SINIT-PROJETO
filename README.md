# SINIT - Computerized Traffic Infraction Notification System

The Traffic Event Subscription Project on the "National Road Safety Authority" (ANSR) / "National Speed Control System" (SINCRO) network aims to implement a strategy for promoting road safety. This strategy involves creating a Computerized Traffic Infraction Notification System (SINIT), which primarily aims to ensure that a driver is aware of any speeding infractions they have committed. Speeding infractions are obtained from control locations by the Traffic Event Management Information System (SIGET). The SIGET computer system, part of the SINCRO system/network simulated in our project, is responsible for validating events and generating traffic offense events. In addition to data on occurrences, a traffic offense event also includes the amount of the fine to be paid.

Immediate awareness of the infraction by the driver avoids the current and usual delays in becoming aware of it and the consequent effects. These effects could lead to a driving ban for a period of time, or more seriously, the revocation of their driving license.

To develop SINIT, React.js technology was used, which is a JavaScript library focused on developing user interfaces for web pages.


# SINIT - Running the mobile web app app

## Paso nº1

Start a PostgreSQL server with two schemas named sinit and siget (The "scripts" directory contains the SQL scripts for creating the schemas and tables).

## Paso nº2

The "siget" and "server" directories both contain a ".env" file. In this file, it is necessary to enter the address of the SQL server created in the previous step.

## Paso nº3

Start by running the siget simulator, i.e., the "siget" directory. To do this, it is only necessary to run the following commands:

```sh
$ npm install
$ npm start
```

## Paso nº4

Run the sinit server through the following commands:

```sh
$ npm install
$ npm start
```

## Paso nº5

Inside the sinit directory, it is necessary to modify the "ipAddress.js" file so that it contains the IP address of the network to which you are connected. Then, initialize the directory using the following commands:

```sh
$ npm install
$ npm start
```

In the terminal, a message will appear containing the IP address available to connect to the system through the mobile browser.
