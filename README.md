# Patient Database Application

An application designed to store the details of patients visiting a hospital or clinic

## Authors

- [@ajaynair1998](https://www.github.com/ajaynair1998)

## Tech Stack

**Client:** Typescript, React, Redux, Material UI

**Server:** Node, Electron, SQLite

## License

[GNU General Public License v3.0](https://github.com/ajaynair1998/patient-db-typescript-april-11/blob/main/LICENSE)

## Support

For support, email ajaynairarun@gmail.com.

## FAQ

#### Error - Please install sqlite3 manually

```javascript
$ npm install --save-dev electron-rebuild
```

```javascript
"scripts": {
    "rebuild": "electron-rebuild -f -w sqlite3"
}
```

```javascript
$ npm run rebuild
```

- [stackoverflow thread](https://stackoverflow.com/questions/49582728/electronjs-please-install-sqlite3-package-manually)

## Guides - @mui/x-date-pickers

#### Installing - @mui/x-date-pickers

```javascript
// with npm
npm install @mui/x-date-pickers
```

This component has the following peer dependencies that you will need to install as well.

```javascript
"peerDependencies": {
  "@mui/material": "^5.4.1",
  "@mui/system": "^5.4.1",
  "react": "^17.0.2 || ^18.0.0"
},
```

You need to provide a date-library that is used by the pickers by setting the dateAdapter to an adapter of your choosing.

i am using Moment.js as the adapter

```javascript
npm install @date-io/moment
```

```javascript
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

function App({ children }) {
	// pass in the required dateAdapter -> in my case the Adaptermoment
	return (
		<LocalizationProvider dateAdapter={AdapterMoment}>
			{children}
		</LocalizationProvider>
	);
}
```

## Contributing

Contributions are always welcome!
