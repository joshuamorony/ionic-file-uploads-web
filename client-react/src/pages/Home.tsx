import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonButton,
} from "@ionic/react";
import React, { useRef } from "react";
import "./Home.css";

interface SingleValues {
  file: any;
}

interface MultipleValues {
  fileOne: any;
  fileTwo: any;
  fileThree: any;
}

const Home: React.FC = () => {
  // Single File Upload
  const singleValues = useRef<SingleValues>({
    file: false,
  });

  // Multiple File Upload
  const multipleValues = useRef<MultipleValues>({
    fileOne: false,
    fileTwo: false,
    fileThree: false,
  });

  // Single File Upload
  const onSingleFileChange = (fileChangeEvent: any) => {
    singleValues.current.file = fileChangeEvent.target.files[0];
  };

  const submitSingleForm = async () => {
    if (!singleValues.current.file) {
      return false;
    }

    let formData = new FormData();

    formData.append("photo", singleValues.current.file, singleValues.current.file.name);

    try {
      const serverUrl = "http://localhost:3000/upload";
      const nestServerUrl = "http://localhost:3000/photos/upload";

      const response = await fetch(serverUrl, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  // Multiple File Upload
  const onFileOneChange = (fileChangeEvent: any) => {
    multipleValues.current.fileOne = fileChangeEvent.target.files[0];
  };

  const onFileTwoChange = (fileChangeEvent: any) => {
    multipleValues.current.fileTwo = fileChangeEvent.target.files[0];
  };

  const onFileThreeChange = (fileChangeEvent: any) => {
    multipleValues.current.fileThree = fileChangeEvent.target.files[0];
  };

  const submitMultipleForm = async () => {
    if (
      !multipleValues.current.fileOne ||
      !multipleValues.current.fileTwo ||
      !multipleValues.current.fileThree
    ) {
      return false;
    }

    let formData = new FormData();
    formData.append(
      "photos[]",
      multipleValues.current.fileOne,
      multipleValues.current.fileOne.name
    );
    formData.append(
      "photos[]",
      multipleValues.current.fileTwo,
      multipleValues.current.fileTwo.name
    );
    formData.append(
      "photos[]",
      multipleValues.current.fileThree,
      multipleValues.current.fileThree.name
    );

    try {
      const serverUrl = "http://localhost:3000/uploads";
      const nestServerUrl = "http://localhost:3000/photos/uploads";

      const response = await fetch(serverUrl, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Image Upload</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Image Upload</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonItem>
          <input type="file" onChange={(ev) => onSingleFileChange(ev)}></input>
        </IonItem>
        <IonButton color="primary" expand="full" onClick={() => submitSingleForm()}>
          Upload Single
        </IonButton>
        <input type="file" onChange={(ev) => onFileOneChange(ev)}></input>
        <input type="file" onChange={(ev) => onFileTwoChange(ev)}></input>
        <input type="file" onChange={(ev) => onFileThreeChange(ev)}></input>
        <IonButton color="primary" expand="full" onClick={() => submitMultipleForm()}>
          Upload Multiple
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
