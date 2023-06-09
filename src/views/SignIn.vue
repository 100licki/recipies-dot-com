<template>
    <div class="pt-20  flex  items-center justify-center">
        
        <div class=" bg-white rounded-md  transition-all shadow-lg shadow-gray-300 px-40 py-10">
            <h1 class = "text-xl font-bold mb-8 text-center">Log in to your account</h1>
            <div class = " mb-2 h-10">
                <input type="text" @keyup.enter="signIn" placeholder="Email" v-model="email" class = "text-sm border-1 bg-white border-gray-200 focus:ring-0 focus:border-orange-300 w-full h-full rounded-md" />
            </div>
            <div class = " mb-3 h-10">
                <input type="password" @keyup.enter="signIn" placeholder="Password" v-model="password" class = "text-sm border-1 bg-white border-gray-200 focus:ring-0 focus:border-orange-300 w-full h-full rounded-md"/>
            </div>
                <p v-if="errMsg" class="text-center text-sm text-red-700 mb-3">{{ errMsg }}</p>
            <div>
                <button @click="signIn" class=" flex items-center justify-center bg-gradient-to-r from-orange-300 to-orange-400 hover:from-orange-300 hover:to-orange-500 text-white font-semibold px-32 py-3 rounded-md shadow-lg hover:shadow-orange-300 w-full h-12">
                    Login
                </button>
            </div>
        </div>   
    </div>
</template>

<script setup>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref("")
const password = ref("")
const errMsg = ref()
const router = useRouter()

const signIn = () => {
    const auth = getAuth()
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((data) => {
            console.log("Successfully signed!")
            console.log(auth.currentUser)
            router.push('/')
        })
        .catch((error) => {
            console.log(error.code);
            switch (error.code) {
                case "auth/invalid-email":
                    errMsg.value = "Invalid email"
                    break
                case "auth/user-not-found":
                    errMsg.value = "No account with that email was found"
                case "auth/wrong-password":
                    errMsg.value = "Email or password was incorrect"
                    break
            }
        })
}
</script>