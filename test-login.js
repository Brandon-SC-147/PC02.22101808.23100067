import axios from 'axios'

async function testLogin() {
  try {
    const response = await axios.post('https://storedb-api.onrender.com/node-api/users/signin', {
      email: 'guerrero@peru.com',
      password: '12345678',
    })
    console.log('Status:', response.status)
    console.log('Data:', JSON.stringify(response.data, null, 2))
  } catch (error) {
    console.error('Error:', error.message)
    if (error.response) {
      console.error('Response Status:', error.response.status)
      console.error('Response Data:', error.response.data)
    }
  }
}

testLogin()
