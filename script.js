
		const qustion = document.querySelector('#qustion');
		const choices = document.querySelectorAll('.choice-text');
		const progressText= document.querySelector('#progressText');
		const scoreText= document.querySelector('#score');
		const progressBarFull= document.querySelector('#progressBarFull');

		let currentQuestion ={}
		let acceptingAnswers = true
		let score = 0
		let questionCounter = 0
		let availableQuestions = []

		let qustions = [
		{
			qustion:'نتیجه جمع  2+2 چه می شود',
			choice1:'2',
			choice2:'4',
			choice3:'21',
			choice4:'17',
			answer:2,
		},
		{
			qustion:'40+20',
			choice1:'80',
			choice2:'44',
			choice3:'60',
			choice4:'70',
			answer:3,
		},
		{
			qustion:'8+8',
			choice1:'2',
			choice2:'4',
			choice3:'21',
			choice4:'16',
			answer:4,
		},
		{
			qustion:'5+5',
			choice1:'10',
			choice2:'4',
			choice3:'20',
			choice4:'15',
			answer:1,
		}
		]

		const SCORE_POINTS = 100
		const MAX_QUESTION = 4

		startGame = () =>{
			questionCounter = 0
			score = 0 
			availableQuestions = [...qustions]
			getNewQuestion()
		}
		getNewQuestion = ()=>{
			if(availableQuestions.length === 0 || questionCounter > MAX_QUESTION) {
				localStorage.setItem('mostRecentScore', score)
				return window.location.assign('./end.html')
			}
			questionCounter++
			progressText.innerText=`Question ${questionCounter} of ${MAX_QUESTION}`
			progressBarFull.style.width = `${(questionCounter/MAX_QUESTION)*100}%`

			const qustionsIndex = Math.floor(Math.random() * availableQuestions.length)
			currentQuestion=availableQuestions[qustionsIndex]
			qustion.innerText = currentQuestion.qustion

			choices.forEach(choices=>{
				const number = choices.dataset['number']
				choices.innerText=currentQuestion['choice' +number]
			})
			availableQuestions.splice(qustionsIndex,1)

			acceptingAnswers=true
		}
		choices.forEach(choice =>{
			choice.addEventListener('click', e =>{
				if (!acceptingAnswers) return

				acceptingAnswers=false 
				const selactedChoice = e.target
				const selectedAnswer = selactedChoice.dataset['number']
				let classToApply = selectedAnswer==currentQuestion.answer ? 'correct':
                'incorrect'
                
				if(classToApply==='correct'){
					incrementScore(SCORE_POINTS)
				}
				selactedChoice.parentElement.classList.add(classToApply)
				setTimeout(()=>{
					selactedChoice.parentElement.classList.remove(classToApply)
					getNewQuestion()
				},1000)
							})
		})
		incrementScore=num=>{
			score+=num
			scoreText.innerText=score
		}
		startGame()