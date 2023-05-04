import styles from './Modal.module.scss'
import { Azeret_Mono } from 'next/font/google'
import { Button } from './PhotoGallery'
import localFont from 'next/font/local'

const azeretMono = Azeret_Mono({
  weight: ['400'],
  subsets: ['latin']
})

const pokemon = localFont({ src: '../public/fonts/Pokemon.ttf' })

export default function Register({ setModal }) {
  const submit = event => {
    event.preventDefault()
    const Name = event.target.name.value
    const Email = event.target.email.value
    const Grade = event.target.grade.value
    const Duration = event.target.duration.value
    if ([Grade, Duration].includes('-- select an option --')) {
      alert('Please fill out the required fields!')
      return
    }

    let source = []
    if (event.target.previous.checked) source.push('From a previous event')
    if (event.target.school.checked) source.push('Hack Club at my school')
    if (event.target.slack.checked) source.push('The Hack Club Slack')
    if (event.target.teacher.checked) source.push('From a teacher')
    if (event.target.other.checked) source.push('Other')

    let helping = []
    if (event.target.mentor.checked) helping.push('Mentor')
    if (event.target.workshop.checked) helping.push('Workshop')
    if (event.target.judging.checked) helping.push('Judging')

    fetch('/api/submit', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        Name,
        Email,
        Grade,
        Duration,
        'Phone number': event.target.phone.value,
        'Pronouns':
          event.target.pronouns.value === '-- select an option --'
            ? null
            : event.target.pronouns.value,
        'School': event.target.school.value,
        'T-shirt size': event.target.size.value,
        'Game experience': event.target.inspiration.value,
        'Goals': event.target.goals.value,
        'Source': source,
        'Helping': helping
      })
    })
      .then(res => res.json())
      .then(json => {
        alert(
          "Awesome! You'll be receiving updates from us soon through your provided email. Make sure to join the slack at hackclub.com/slack/?event=angelhacks (you'll be redirected)!"
        )
        window.location.href = "https://hackclub.com/slack/?event=angelhacks";
        setModal(false)
      })
      .catch(err => console.log(err))
  }

  return (
    <>
      <style jsx global>{`
        body,
        html {
          overflow: hidden;
        }
        .question {
          font-size: 1.3rem;
          font-weight: 800;
          padding-top: 15px;
        }
      `}</style>
      <div
        className={`${styles.wrapper} ${azeretMono.className}`}
        onClick={() => setModal(false)}>
        <div onClick={event => event.stopPropagation()}>
          <svg
            style={{ display: 'block' }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320">
            <path
              fill="white"
              fill-opacity="1"
              d="M0,320L36.9,288L73.8,64L110.8,224L147.7,128L184.6,0L221.5,320L258.5,64L295.4,64L332.3,288L369.2,256L406.2,288L443.1,192L480,32L516.9,64L553.8,288L590.8,0L627.7,32L664.6,288L701.5,64L738.5,192L775.4,128L812.3,320L849.2,160L886.2,256L923.1,64L960,96L996.9,128L1033.8,96L1070.8,192L1107.7,128L1144.6,32L1181.5,192L1218.5,256L1255.4,128L1292.3,96L1329.2,128L1366.2,192L1403.1,64L1440,224L1440,320L1403.1,320L1366.2,320L1329.2,320L1292.3,320L1255.4,320L1218.5,320L1181.5,320L1144.6,320L1107.7,320L1070.8,320L1033.8,320L996.9,320L960,320L923.1,320L886.2,320L849.2,320L812.3,320L775.4,320L738.5,320L701.5,320L664.6,320L627.7,320L590.8,320L553.8,320L516.9,320L480,320L443.1,320L406.2,320L369.2,320L332.3,320L295.4,320L258.5,320L221.5,320L184.6,320L147.7,320L110.8,320L73.8,320L36.9,320L0,320Z"></path>
          </svg>
          <div className={styles.form}>
            <div className={styles.center}>
              <h1
                className={`${pokemon.className} special`}
                style={{ fontSize: '5rem' }}>
                AngelHacks <sup>3.0</sup>
              </h1>
              <div
                className={`prose ${styles.prose}`}
                style={{ fontSize: '1.1rem' }}>
                <p>
                  We're so excited to see you at AngelHacks, the official Hack
                  Club Spring Event! :) Please register here!{' '}
                </p>
                <p>
                  AngelHacks 3.0 will be in Boston in Late May, and you can
                  choose between staying for 12 hours and 24 hours (overnight).
                  Unfortunately, we cannot provide travel stipends, but we do
                  have satellite events in Toronto, San Francisco, and Los
                  Angeles! You can find the link to these soon at our website
                  (angelhacks.org)!
                </p>
                <p>
                  It'll also be a game jam, meaning everything made is a game!
                  But this is in no way a limitation because you can create
                  board games, puzzle hunts, platformers, ARGs, etc... anything
                  is fair game ;). All skill levels and experience with game dev
                  are welcome!
                </p>
                <p>
                  (Once you submit, make sure to go to hackclub.com/slack/?event=angelhacks to join the
                  Hack Club slack & the AngelHacks channels! Please keep the tab
                  open or download the Slack app so you get our notifications
                  and get to know your other attendees!)
                </p>
              </div>
              <form onSubmit={submit}>
                <div>
                  <label className='question'>
                    Full name<span>*</span>
                  </label>
                  <input type="text" required name="name" />
                </div>
                <div>
                  <label className='question'>
                    Email<span>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="(preferably not a school email so our emails won't bounce)"
                  />
                </div>
                <div>
                  <label className='question'>Phone number</label>
                  <input type="phone" name="phone" />
                </div>
                <div>
                  <label className='question'>Pronouns</label>
                  <select name="pronouns">
                    <option disabled selected>
                      {' '}
                      -- select an option --{' '}
                    </option>
                    <option value="she/her">she/her</option>
                    <option value="he/him">he/him</option>
                    <option value="they/them">they/them</option>
                    <option value="other">other</option>
                  </select>
                </div>
                <div>
                  <label className='question'>School</label>
                  <input name="school" type="text" />
                </div>
                <div>
                  <label className='question'>
                    Grade<span>*</span>
                  </label>
                  <p>
                    If you don't see your grade below, feel free to choose other
                    and explain! A note though: we are targeting primarily high
                    school / older middle school students.{' '}
                  </p>
                  <select required name="grade">
                    <option disabled selected>
                      {' '}
                      -- select an option --{' '}
                    </option>
                    <option value="7th grade">7th grade</option>
                    <option value="8th grade">8th grade</option>
                    <option value="9th grade">9th grade</option>
                    <option value="10th grade">10th grade</option>
                    <option value="11th grade">11th grade</option>
                    <option value="12th grade">12th grade</option>
                    <option value="College/university">
                      College/university
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className='question'>
                    Duration<span>*</span>
                  </label>
                  <p>
                    We have 2 options for duration: staying for just saturday
                    (12 hours) or overnight (24 hours, bring a sleeping bag!){' '}
                  </p>
                  <select required name="duration">
                    <option disabled selected>
                      {' '}
                      -- select an option --{' '}
                    </option>
                    <option value="12 hours">12 hours</option>
                    <option value="24 hours">24 hours</option>
                  </select>
                </div>
                <div>
                  <label className='question'>T-shirt size</label>
                  <p>For some swag &lt;3</p>
                  <select name="size">
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option default selected value="No shirt, thanks!">
                      No shirt, thanks!
                    </option>
                  </select>
                </div>
                <div>
                  <label className='question'>Game experience</label>
                  <p>
                  What are your favorite games? Fav soundtracks? Also, maybe any game dev stuff you've done in the past? (optional)
                  </p>
                  <input type="text" name="inspiration" />
                </div>
                <div>
                  <label className='question'>Goals & Notes!</label>
                  <p>
                  What do you hope to get/see at angelhacks? Feel free to ramble! Do you have any dietary restrictions? (totally optional)
                  </p>
                  <input type="text" name="goals" />
                </div>
                <div>
                  <label className='question'>Where did you hear about us?</label>
                  <p>
                    (optional)
                  </p>
                  <label>
                    <input name="previous" type="checkbox" />
                    From a previous event (i.e. 2.0/1.0)
                  </label>
                  <label>
                    <input name="school" type="checkbox" />
                    Hack Club at my school
                  </label>
                  <label>
                    <input name="slack" type="checkbox" />
                    The Hack Club Slack
                  </label>
                  <label>
                    <input name="teacher" type="checkbox" />
                    From a teacher
                  </label>
                  <label>
                    <input name="other" type="checkbox" />
                    Other
                  </label>
                </div>
                <div>
                  <label className='question'>Finally, would you be interested in helping?</label>
                  <p>
                    Since we are a beginner oriented game jam/hackathon, if you
                    feel like you have some more experience/are not an HS student we'd love to have
                    you as a mentor/workshop teacher/etc!
                  </p>
                  <label>
                    <input name="mentor" type="checkbox" />
                    Mentor
                  </label>
                  <label>
                    <input name="workshop" type="checkbox" />
                    Workshop
                  </label>
                  <label>
                    <input name="judging" type="checkbox" />
                    Judging
                  </label>
                </div>
                <Button fontSize="1.1rem">Here we go!!!</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
