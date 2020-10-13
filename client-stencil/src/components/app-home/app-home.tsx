import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
})
export class AppHome {
  // Single file upload
  private file: File;

  // Multiple file upload
  private fileOne: File;
  private fileTwo: File;
  private fileThree: File;

  // Single file upload
  onSingleFileChange(fileChangeEvent) {
    this.file = fileChangeEvent.target.files[0];
  }

  async submitSingleForm() {
    let formData = new FormData();
    formData.append('photo', this.file, this.file.name);

    try {
      const serverUrl = 'http://localhost:3000/upload';
      const nestServerUrl = 'http://localhost:3000/photos/upload';

      const response = await fetch(serverUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }

  // Multiple file upload:
  onFileOneChange(fileChangeEvent) {
    this.fileOne = fileChangeEvent.target.files[0];
  }

  onFileTwoChange(fileChangeEvent) {
    this.fileTwo = fileChangeEvent.target.files[0];
  }

  onFileThreeChange(fileChangeEvent) {
    this.fileThree = fileChangeEvent.target.files[0];
  }

  async submitMultipleForm() {
    let formData = new FormData();
    formData.append('photos[]', this.fileOne, this.fileOne.name);
    formData.append('photos[]', this.fileTwo, this.fileTwo.name);
    formData.append('photos[]', this.fileThree, this.fileThree.name);

    try {
      const serverUrl = 'http://localhost:3000/uploads';
      const nestServerUrl = 'http://localhost:3000/photos/uploads';

      const response = await fetch(serverUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Home</ion-title>
        </ion-toolbar>
      </ion-header>,

      <ion-content class="ion-padding">
        <ion-item>
          <ion-label>Image</ion-label>
          <input type="file" onChange={ev => this.onSingleFileChange(ev)}></input>
        </ion-item>
        <ion-button color="primary" expand="full" onClick={() => this.submitSingleForm()}>
          Upload Single
        </ion-button>

        <input type="file" onChange={ev => this.onFileOneChange(ev)}></input>
        <input type="file" onChange={ev => this.onFileTwoChange(ev)}></input>
        <input type="file" onChange={ev => this.onFileThreeChange(ev)}></input>

        <ion-button color="primary" expand="full" onClick={() => this.submitMultipleForm()}>
          Upload Multiple
        </ion-button>
      </ion-content>,
    ];
  }
}
