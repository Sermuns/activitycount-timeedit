import { scramble } from './te_scramble'

export function getTimeEditURLs (course) {
  const type = 219
  //const apiUrl ='https://cloud.timeedit.net/liu/web/schema/ri16YXQ8678Z56Qm6X0857Q6y4Y750626Y45Y7gQ7076725Z7.html'
  const base = 'https://cloud.timeedit.net/liu/web/schema'
  //const apiUrl = `${base}/objects.html?l=sv_SE&search_text=${course}&types=${type}&fe=132.0&sid=3&ox=0`
  const apiUrl =
    'https://cloud.timeedit.net/liu/web/schema/ri.html?h=t&sid=3&p=20230802%2C20231231&objects=733423.219&ox=0&types=0'
  //const apiUrl = 'https://jsonplaceholder.typicode.com/posts/1'

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.text() // Parse the JSON response
    })
    .then(data => {
      console.log('Fetched data:', data)
    })
    .catch(error => {
      console.error('There was a problem fetching the data:', error)
    })

  //fetch(identURL)
  //  .then(res => res.json())
  //  .then(data => {
  //    const identVirtuals = data.records.map(record => record.identVirtual)
  //    // p=0.d%20231231.x betyder idag till jul
  //    const objects = identVirtuals.join(',')

  //    const startSemester = '20230801'
  //    const endSemester = '20231231'

  //    const querySemester = `h=t&sid=3&p=${startSemester},${endSemester}&objects=${objects}&ox=0&types=0&fe=0`
  //    const queryFuture = `h=t&sid=3&p=0.d,${endSemester}.x&objects=${objects}&ox=0&types=0&fe=0`

  //    const semesterUrl = base + '/ri' + scramble(querySemester)
  //    const futureUrl = base + '/ri' + scramble(queryFuture)
  //    //https://cloud.timeedit.net/liu/web/schema/ri.html?h=t&sid=3&p=20230802%2C20231231&objects=733423.219&ox=0&types=0

  //    resolve([semesterUrl, futureUrl])
  //  })
  //  .catch(err => reject(err))
}
