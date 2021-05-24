export default function fetchCountries(searchQuery) {
        return fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`)
        .then(response => {
            console.log(response)
            if (response.ok) return response.json()
            throw new Error("Error fetching data")   
        })
            .catch(error => {
                console.log('This is error:', error)
            })
        }
