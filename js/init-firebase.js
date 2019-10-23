var firebaseConfig = {
    apiKey: "AIzaSyCHRrrwBbGuRCm8Do_gvE76xO7be5-udQg",
    authDomain: "ecormerceapp.firebaseapp.com",
    databaseURL: "https://ecormerceapp.firebaseio.com",
    projectId: "ecormerceapp",
    storageBucket: "ecormerceapp.appspot.com",
    messagingSenderId: "351535192680",
    appId: "1:351535192680:web:4605865242bcefab81b9dd",
    measurementId: "G-JK7Q6Y9M03"
    };

    firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();
    var storage = firebase.storage();

