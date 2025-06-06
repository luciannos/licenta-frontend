// views/RegisterView.vue
<template>
  <q-page class="auth-page">
    <div class="auth-form">
      <h2>Register</h2>
      <q-input v-model="firstName" label="First Name" type="text" filled />
      <q-input v-model="lastName" label="Last Name" type="text" filled class="q-mt-md" />

      <div class="q-mt-md">
        <label class="q-mb-sm">Gender</label>
        <q-option-group v-model="gender" :options="genderOptions" type="radio" inline />
      </div>

      <q-input
        v-if="gender === 'Other'"
        v-model="otherGender"
        label="Please specify"
        type="text"
        filled
        class="q-mt-md"
      />

      <q-input v-model="email" label="Email" type="email" filled class="q-mt-md" />
      <q-input
        v-model="password"
        filled
        :type="isPwd ? 'password' : 'text'"
        label="Password"
        hint="Minimum 8 characters, 1 uppercase, 1 number, 1 special character"
        :rules="[(val) => (isPasswordValid ? true : 'Password does not meet criteria')]"
        class="q-mt-md"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>

      <q-input
        v-model="confirmPassword"
        filled
        :type="isConfirmPwd ? 'password' : 'text'"
        label="Confirm Password"
        :error="confirmTouched && !doPasswordsMatch"
        error-message="Passwords do not match"
        class="q-mt-md"
        @blur="confirmTouched = true"
      >
        <template v-slot:append>
          <q-icon
            :name="isConfirmPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isConfirmPwd = !isConfirmPwd"
          />
        </template>
      </q-input>

      <q-input v-model="phone" label="Phone Number" type="tel" filled class="q-mt-md" />
      <q-input v-model="address" label="Address" type="text" filled class="q-mt-md" />

      <q-btn
        label="Register"
        color="secondary"
        class="q-mt-lg full-width"
        @click="handleRegister"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';

export default defineComponent({
  name: 'RegisterView',
  setup() {
    const firstName = ref('');
    const lastName = ref('');
    const gender = ref('');
    const otherGender = ref('');
    const email = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const phone = ref('');
    const address = ref('');
    const isPwd = ref(true);
    const isConfirmPwd = ref(true);
    const confirmTouched = ref(false);

    const genderOptions = [
      { label: 'Male', value: 'Male' },
      { label: 'Female', value: 'Female' },
      { label: 'Other', value: 'Other' },
    ];

    const isPasswordValid = computed(() => {
      return /^(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/.test(password.value);
    });

    const doPasswordsMatch = computed(() => password.value === confirmPassword.value);

    const handleRegister = () => {
      confirmTouched.value = true;
      if (!isPasswordValid.value) {
        alert('Password does not meet criteria.');
        return;
      }
      if (!doPasswordsMatch.value) {
        alert('Passwords do not match.');
        return;
      }
      const genderValue = gender.value === 'Other' ? otherGender.value : gender.value;
      alert(`Registering ${firstName.value} ${lastName.value} (${genderValue})`);
    };

    return {
      firstName,
      lastName,
      gender,
      otherGender,
      email,
      password,
      confirmPassword,
      phone,
      address,
      genderOptions,
      handleRegister,
      isPwd,
      isConfirmPwd,
      confirmTouched,
      isPasswordValid,
      doPasswordsMatch,
    };
  },
});
</script>

<style scoped lang="scss">
.auth-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
}
.auth-form {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  width: 320px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
