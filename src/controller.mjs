export default class Controller {
  constructor({ view, media, recorder }) {
    this.view = view;
    this.media = media;
    this.recorder = recorder;
  }

  static initialize(dependecies) {
    const instance = new Controller(dependecies);
    // console.log(dependecies);
    return instance._init();
  }

  _init() {
    this.view.configureStartRecordingButton(this.onStartRecording.bind(this));
    this.view.configureStopRecordingButton(this.onStopRecording.bind(this));
  }

  async onStartRecording() {
    const audioStream = await this.media.getAudio();
    // console.log("iniciou a gravação");
    this.recorder.startRecording(audioStream);
  }

  async onStopRecording() {
    // console.log("parou a gravação");
    this.recorder.stopRecording();

    setTimeout(() => {
      const audioURL = this.recorder.getRecordingURL();
      this.view.playAudio(audioURL);
    });
  }
}
