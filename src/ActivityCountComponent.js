import './App.css'
import React, { useState } from 'react'
import ActivityTable from './ActivityTable'
import { Link } from 'react-router-dom'
import { getTimeEditURLs } from './getTimeEditURLs'

/**
 * Returns a component that asks user for a course code and student group,
 * then shows the number of lectures/other activites that have passed
 * @param {boolean} show whether to show the component or not
 * @returns
 */
function ActivityCountComponent () {
  const [course, setCourse] = useState('')
  const [studentGroup, setStudentGroup] = useState('')
  const [searchStudentGroup, setSearchStudentGroup] = useState('')
  const [scheduleUrls, setScheduleUrls] = useState(null)
  const [shouldShowURLs, setShouldShowURLs] = useState(false)
  const [shouldShowActivityTable, setShouldShowActivityTable] = useState(false)

  function performSearch () {
    getTimeEditURLs('tata24')
  }

  const handleKeyDown = e => {
    if (e.keyCode === 13) {
      performSearch()
      setShouldShowActivityTable(true)
    }
  }

  return (
    <div className='Information'>
      <h2>Undervisningsnummer</h2>
      <p>
        Se hur många förläsningar, lektioner, etc. som har passerat i en kurs!
      </p>
      <div className='InputContainer'>
        <input
          type='text'
          placeholder='En kurskod (t.ex. TATA24)'
          value={course}
          onChange={e => setCourse(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <input
          type='text'
          placeholder='En studentgrupp (t.ex. D2.c)'
          value={studentGroup}
          onChange={e => setStudentGroup(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <button onClick={performSearch}>Sök!</button>
      {shouldShowActivityTable && (
        <ActivityTable url={scheduleUrls} studentGroup={searchStudentGroup} />
      )}
      <button
        className='UrlButton'
        onClick={() => setShouldShowURLs(!shouldShowURLs)}
      >
        {shouldShowURLs ? '✓ ' : ''}
        visa URL:er
      </button>
      {shouldShowURLs && scheduleUrls && (
        <table className='UrlTable'>
          <tr>
            <td>terminschema</td>
            <td>
              <Link to={scheduleUrls.split(' ')[0]}>
                {scheduleUrls.split(' ')[0]}
              </Link>
            </td>
          </tr>
          <tr>
            <td>idag-framåt-schema</td>
            <td>
              <Link to={scheduleUrls.split(' ')[1]}>
                {scheduleUrls.split(' ')[1]}
              </Link>
            </td>
          </tr>
        </table>
      )}
    </div>
  )
}

export default ActivityCountComponent
