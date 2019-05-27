# Mist react-native application
This repository is a starting point for react-native apps. Wifi-commissioning, redux  and translations are included. If you are interested in only the mist library for react-native use [mist-react-native-boilerplate](https://github.com/ControlThings/mist-react-native-boilerplate) instead.
## License 

Source to this example application is released under Apache 2.0 license
by ControlThings Oy Ab. In order to use the application, you will need
to get a license for react-native-mist-library from ControlThings Oy Ab.
https://controlthings.fi/

## Setting up


1. node.js version 10 has been used under development. 
	* Install with Node version manager: `nvm install 10`
	* Note that this could change, if you don't specifify explicit version in `package.json`, as the react-native project continues to release versions which might depend on newer versions of node.js.
  
2. `npm install`

Installs all dependencies in package.json and a pre-install script, which downloads the
react-native-mist-library from ControlThings' Artifactory server. You
will need to contact ControlThings Oy Ab to get the required
credentials.

The required credentials should be put into '~/.gradle/gradle.properties',
so they are also available for Gradle (only used with Android build).

```
artifactory_username=your_username
artifactory_password=your_password
```

Note that this only for convenience. If you skip this step, then the
pre-install script will prompt you to input the information. However, you will still need to set up 'gradle.properties' if you plan develping for Android.

3. Connect a phone and execute `react-native run-android` 
