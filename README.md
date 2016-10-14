# bubble-user-rn
[Native] React-Native flavour of Bubble: A problem-solving and stress management anonymous chat application

## Quick Start
1. Install node and watchman.

    ``` bash
    brew install node
    brew install watchman
    ```
2. Install React Native Client globally.

    ``` bash
    npm install -g react-native-cli
    ```

3. Install XCode and Android Studio.

4. Configure Android SDK.
    1. Setup Android Environment and $PATH in .bashrc and .profile.
    ```
    // Locate the Android SDK yourself. It might not be the same as ANDROID_HOME here.
    export ANDROID_HOME=/Users/<YOUR_USERNAME>/Library/Android/sdk
    export PATH=$PATH:$ANDROID_HOME/tools
    export PATH=$PATH:$ANDROID_HOME/platform-tools
    ```
    2. Install Android SDK Platform-tools, revision 23.0.1. (Open through Android Studios)
    3. Install and setup Android Virtual Device.
        ``` bash
        android avd
        ```
        
5. Install dependencies.
    ``` bash
    npm install
    ```
6. Run with Android.
    ``` bash
    react-native run-android
    ```
    > If you encounter Server 500 Error, try to kill the process that is sharing the same port as the emulator and try again.
7.  Run with iOS.
    ``` bash
    react-native run-ios
    ```
