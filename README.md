# Andeor

## Description
Add more informations to your videos and manipulate them to make a better experience.

The goal of the project is to add some data between two timestamp of a video, then Andeor will send you events which have datas when the video is between those two timestamps.

This can also work with HTMLMediaElement Audio and Video too so you can make better visualization to your podcasts for example.

## Install

`npm install --save andeor`

## How it works
Andeor works with an event emitter, a provider and some datas.

The provider is here to tell to andeor the timestamp of your element. And event emitter is here to send you the data you want between a timestamp.

And now datas. They are easy to format, you just need an array of object like this:
```javascript
const datas = [
  {
    timeBegin: 0, // Need to be a number
    timeEnd: 10, // Need to be a number greater than "timeBegin"
    data: 'Here is some data', // Can be what you want (Object, string, number, etc)
  }
]
```

Andeor have 4 different events:

* `0`: Running => Emit when andeor run function is executed
* `1`: Stopped => Emit when andeor stop function is executed
* `2`: Add => Emit when data is between the provider's time
* `3`: Remove => Emit when data was already add and is no longer between the provider's time

They can be easily imported as variables when events are imported:

* `Andeor.events.running`
* `Andeor.events.stopped`
* `Andeor.events.add`
* `Andeor.events.remove`

Andeor come with a `DefaultProvider` to create new ones and a `YoutubeProvider` who takes a YT.Player instance in constructor. 

Here is a setup example for youtube video:
```javascript
import Andeor, { YoutubeProvider, events } from 'andeor';

const provider = new YoutubeProvider(player); // player is object created with new YT.Player
const andeorInstance = new Andeor(datas, provider);

andeorInstance.on(events.add, (data) => {
  // Do what ever you want with this data
});
```

## Create your own provider

To create your own provider you need to create a class that extend `DefaultProvider`. Like that:

```javascript
import { DefaultProvider } from 'andeor'

class AnotherProvider extends DefaultProvider {
  /**
   *  this.andeor have a reference on the andeor instance where you add this provider
   * You can use method run() and stop() to make andeor running and stopped.
   */
  preload() {
    // Function that use your player event to run and stop andeor
    this.andeor.run();
    return true;
  }

  getTime() {
    // Function that return the time of your player
    return 0;
  }
}
```

---

For more informations don't hesitate to contact me on twitter: [@ventinc_](https://twitter.com/ventinc_)