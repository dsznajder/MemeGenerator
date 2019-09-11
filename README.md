# MemeGenerator

## Dependencies included:

- [react-native-gesture-handler](https://github.com/kmagiera/react-native-gesture-handler)
- [react-native-reanimated](https://github.com/kmagiera/react-native-reanimated)
- [react-native-screens](https://github.com/kmagiera/react-native-screens)
- [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)
- [react-navigation](https://github.com/react-navigation/react-navigation)
- [react-native-redash](https://github.com/wcandillon/react-native-redash)
- [react-native-share](https://github.com/react-native-community/react-native-share)
- [react-native-fs](https://github.com/itinance/react-native-fs)
- [react-native-view-shot](https://github.com/gre/react-native-view-shot)

## Setup

[Prerequires](https://gist.github.com/dsznajder/6cc186491f53ca9b1be7eebdf68ab5c5)

- `yarn bootstrap`

And project is ready :)

## Overview

- [Text](https://facebook.github.io/react-native/docs/text)
- [View](https://facebook.github.io/react-native/docs/view)
- [StyleSheet](https://facebook.github.io/react-native/docs/stylesheet)

### Task 1

Create and render list of items with [FlatList](https://facebook.github.io/react-native/docs/flatlist.html).

### Task 2

Fetch and render items from https://api.imgflip.com/get_memes API.

### Task 3

 - Create simple [stack navigator](https://reactnavigation.org/docs/en/stack-navigator-2.0.html#api-definition)
 - Create 2 Scenes: One for listing and second one which will render item on which you clicked.

### Task 4

 - Create [TextInput](https://facebook.github.io/react-native/docs/textinput.html)
 - Show typed text on Image
 - Capture Image with Text on it. Use `react-native-view-shot`

### Task 5
 - Save / "Read" created meme. Use `react-native-fs`. In addition you can use `react-native-share` to share it through social media or save it on phone.

### Task 6*
 - Use PanGestureHandler from `react-native-gesture-handler` for Text positioning.
