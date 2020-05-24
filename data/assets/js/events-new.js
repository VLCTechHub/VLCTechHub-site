Site.Events = Site.Events || {}
Site.Events.New = {}
Site.Events.New.init = function() {
  let DST = {
    2019: { start: new Date(2019, 2, 31, 2), end: new Date(2019, 9, 27, 3) },
    2020: { start: new Date(2020, 2, 29, 2), end: new Date(2020, 9, 25, 3) },
    2021: { start: new Date(2021, 2, 28, 2), end: new Date(2021, 9, 31, 3) },
    2022: { start: new Date(2022, 2, 27, 2), end: new Date(2022, 9, 30, 3) },
    2023: { start: new Date(2023, 2, 26, 2), end: new Date(2023, 9, 29, 3) },
    2024: { start: new Date(2024, 2, 31, 2), end: new Date(2024, 9, 27, 3) },
    2025: { start: new Date(2025, 2, 30, 2), end: new Date(2025, 9, 26, 3) },
    2026: { start: new Date(2026, 2, 29, 2), end: new Date(2026, 9, 25, 3) },
    2027: { start: new Date(2027, 2, 28, 2), end: new Date(2027, 9, 31, 3) },
    2028: { start: new Date(2028, 2, 26, 2), end: new Date(2028, 9, 29, 3) },
    2029: { start: new Date(2029, 2, 25, 2), end: new Date(2029, 9, 28, 3) }
  }

  function $E(selector) {
    return document.querySelector(selector)
  }

  function getUTCOffset(date) {
    let utcOffset = 1

    let dst = DST[date.getUTCFullYear()]
    if (dst && date >= dst.start && date < dst.end) {
      utcOffset = 2
    }
    return utcOffset
  }

  function buildEventDateTime() {
    let date = $E('#startDate').value
    let time = $E('#startTime').value
    let offset = getUTCOffset(new Date(date))
    return `${date}T${time}+0${offset}:00`
  }

  function buildEventAPIData() {
    let data = {
      title: $E('#title').value,
      description: $E('#description').value,
      link: $E('#sourceUrl').value,
      hashtag: $E('#hashtag').value,
      date: buildEventDateTime()
    }
    return data
  }

  function clearForm() {
    let fields = ['#title', '#description', '#startDate', '#startTime', '#sourceUrl', '#hashtag']
    fields.forEach(field => {
      $E(field).value = ''
    })
    $form.removeAttribute('data-submit-attempted')
  }

  function showValidationErrors() {
    $form.setAttribute('data-submit-attempted', true)
    $form.querySelector(':invalid').focus()
  }

  function showOKMessage() {
    $E('.notification.success').style.display = 'block'
    $E('.notification.error').style.display = 'none'
    $E('header .title').scrollIntoView({ behaviour: 'smooth', block: 'end' })
  }

  function showKOMessage() {
    $E('.notification.success').style.display = 'none'
    $E('.notification.error').style.display = 'block'
    $E('header .title').scrollIntoView({ behaviour: 'smooth', block: 'end' })
  }

  function submitEvent() {
    if (!$form.checkValidity()) {
      showValidationErrors()
      return false
    }

    fetch(Site.API_ROOT + '/events/', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(buildEventAPIData())
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Response not ok')
        }
      })
      .then(() => {
        clearForm()
        showOKMessage()
      })
      .catch(() => {
        showKOMessage()
      })
    return false
  }

  let $form = $E('#new-event form')
  $form.querySelector('button[data-type="submit"]').addEventListener('click', submitEvent)
}
