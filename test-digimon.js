import axios from 'axios'

async function testDigimonApi() {
  try {
    console.log('Fetching Digimons...')
    const response = await axios.get('https://digimon-api.vercel.app/api/digimon', {
      timeout: 5000,
    })
    console.log('Status:', response.status)
    console.log('Count:', response.data.length)
  } catch (error) {
    console.error('Error:', error.message)
  }
}

testDigimonApi()
