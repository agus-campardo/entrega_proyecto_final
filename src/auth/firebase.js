// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { 
  getAuth, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup 
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDacJjPlNEUF--GoNiS1lEbxxmVneEDJag",
  authDomain: "entregaproyectofinal-86f5b.firebaseapp.com",
  projectId: "entregaproyectofinal-86f5b",
  storageBucket: "entregaproyectofinal-86f5b.firebasestorage.app",
  messagingSenderId: "168168876788",
  appId: "1:168168876788:web:561438287f13b45f0acca1",
  measurementId: "G-6NXE74S5GE"
};

const app = initializeApp(firebaseConfig);

//////////////////////////////////////////////////////////////////////
///////////////// AUTENTICACIÓN DE USUARIOS FIREBASE//////////////////////////
//////////////////////////////////////////////////////////////////////

const provider = new GoogleAuthProvider();
const auth = getAuth();

export function crearUsuario(email, password){
    return(
        new Promise((res, rej) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                console.log("Credenciales", userCredential)
                const user = userCredential.user;
                console.log(user)
                res(user)
                // ...
            })
            .catch((error) => {
                console.log(error.code, error.message)
                const errorCode = error.code;
                const errorMessage = error.message;
                rej(error)
                // ..
            });
        })
    )
}

auth.useDeviceLanguage()
export function logearG(){
    return(
        new Promise((res, rej) => {
            signInWithPopup(auth, provider)
            .then((result) => {
                console.log("test", result)
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                console.log("credenciales G", credential)
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log("User", user)
                res(user)
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                console.log("test error", error )
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                rej()
                // ...
            });   
        })
    )

}

export function loginEmailPass(email, password){
    return(
        new Promise((res, rej) => {
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                console.log("Credenciales", userCredential)
                const user = userCredential.user;
                console.log(user)
                res(user)
            })
            .catch((error) => {
                console.log(error.code)
                const errorCode = error.code;
                const errorMessage = error.message;
                rej(error)
            });
        })
    )
}
/////////////////////////////////////////////////////////////////
///////////////////// BASE DE DATOS FIRESTORE  //////// ////////
////////////////////////////////////////////////////////////////

import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, setDoc } from "firebase/firestore";

const db = getFirestore(app);

export function crearProducto(producto) {
    return new Promise(async (res, rej) => {
        try {
        const docRef = await addDoc(collection(db, "productos"), {
            name: producto.name,
            image: producto.image,
            price: producto.price,
            description: producto.description
        });

        console.log("Document written with ID: ", docRef.id);
        res(docRef)

        } catch (e) {
        console.error("Error adding document: ", e);
        rej(e)
        }
    });
}

export function editarProductoFirebase(producto){
    return(
        new Promise(async (res, rej) => {
            try{
                await setDoc(doc(db, "productos", producto.id), {
                    name: producto.name,
                    image: producto.image,
                    price: producto.price,
                    description: producto.description
                })
                console.log("Document written ");
                res()
            }catch (e){
                console.error("Error adding document: ", e);
                rej(e)
            }
        })
    )
}

export function eliminarProductoF(id){
    return(
        new Promise(async(res, rej) => {
            try{
                await deleteDoc(doc(db, "productos", id))
                res()
            }catch (e){
                console.error("Error adding document: ", e);
                rej(e)
            }

        })
    )
}

export function obtenerProductosF() {
    return(
        new Promise(async (res, rej) => {
                try {
                    const querySnapshot = await getDocs(collection(db, "productos"));
                    console.log(querySnapshot, "respuesta al getDocs")
                    
                    const resultados = querySnapshot.docs.map(doc => {
                        console.log(doc, "documento sin ejecutar metodo .data()")
                        const data = doc.data();
                        console.log(data, "doc con data extraida")
                        return {
                            id: doc.id,
                            name: data.name,
                            image: data.image,
                            price: data.price,
                            description: data.description
                        };
                    });

                    res (resultados);
                } catch (error) {
                    console.error("Error al obtener los usuarios:", error);
                    rej (error);
                }
        })
    )
}

export function obtenerProductoEnFirebase(id) {
    return(
        new Promise(async (res, rej) => {
                try {
                    const docRef = doc(db, "productos", id);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        console.log("Document data:", docSnap.data());
                        const data = docSnap.data();
                        const producto = {
                            id: docSnap.id,
                            name: data.name,
                            image: data.image,
                            price: data.price,
                            description: data.description
                        }
                        console.log(producto)
                        res(producto)
                    } else {
                    // docSnap.data() will be undefined in this case
                    console.log("No such document!");
                        rej("No such document!")
                    }
                } catch (error) {
                    console.error("Error al obtener los usuarios:", error);
                    rej (error);
                }
        })
    )
}

/*crearProducto("test", "url", 23, "klasjdklsajdsaldkklasdljka").then(() => {
    console.log("si")
}).catch((error) => {
    console.log(error)
})*/

/*obtenerProductos().then((prod) => {
    console.log(prod)
}).catch((error) => {
    console.log(error)
})*/