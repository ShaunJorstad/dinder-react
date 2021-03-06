import fireStore, { googleProvider, auth } from "./FireConfig";

export function emailIsRegistered(email: string): Promise<any> {
  return fireStore
    .collection("Users")
    .doc(email)
    .get()
    .then((doc) => {
      return new Promise((resolve, reject) => {
        if (doc.exists) {
          resolve(true);
        } else {
          reject(false);
        }
      });
    });
}

export function watchAuthentication(callback: any) {
  auth.onAuthStateChanged((credential) => {
    console.log("AUTH state change");
    console.log(credential);
    let email = "";
    if (credential) {
      console.log(`updating MST with the email: ${credential?.email}`);
      email = credential?.email as string;
    }
    callback(email);
  });
}

export function signOut() {
  auth.signOut();
}

export function signIn(email: string, password: string): Promise<any> {
  return auth.signInWithEmailAndPassword(email, password);
}

export function signUp(email: string, password: string): Promise<any> {
  return auth
    .createUserWithEmailAndPassword(email, password)
    .then((credential) => {
      fireStore
        .collection("Users")
        .doc(email)
        .set({
          uid: credential.user?.uid,
        })
        .catch((error) => {
          console.log(error);
        });
    });
}

export function sendPasswordReset(email: string): Promise<any> {
  return auth.sendPasswordResetEmail(email);
}

/**
 * this function currently isn't supported by expo and the firestore web sdk
 */
export function authorizeWithGoogle() {
  auth
    .signInWithPopup(googleProvider)
    .then((result) => {
      var credential = result.credential;
      var user = result.user;
      console.log(user);
    })
    .catch((error) => {
      console.log(error);
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
}

export function deleteSessionDoc(docID: string) {
  console.log(`Deleting ${docID} document`);
  fireStore.collection("Sessions").doc(docID).delete();
}

export function createSessionDoc(): Promise<any> {
  console.log("Generating a document");
  let code = Math.floor(Math.random() * (99999 - 10000) + 10000);
  let docID = code.toString();
  return fireStore
    .collection("Sessions")
    .doc(docID)
    .get()
    .then((doc: any) => {
      if (doc.exists) {
        console.log("document exists");
        return createSessionDoc();
      } else {
        return fireStore
          .collection("Sessions")
          .doc(docID)
          .set({
            id: code,
          })
          .then(() => {
            return new Promise((resolve, reject) => {
              resolve(docID);
            });
          });
      }
    });
}
