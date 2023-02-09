import React, { Component } from 'react'
import './Home.css'
const countryName = ["BD", "BE", "BF", "BG", "BA", "IN", "BB", "WF", "BL", "BM", "BN", "BO", "BH", "BI", "BJ", "BT", "JM", "BV", "BW", "WS", "BQ", "BR", "BS", "JE", "BY", "BZ", "RU", "RW", "RS", "TL", "RE", "TM", "TJ", "RO", "TK", "GW", "GU", "GT", "GS", "GR", "GQ", "GP", "JP", "GY", "GG", "GF", "GE", "GD", "GB", "GA", "SV", "GN", "GM", "GL", "GI", "GH", "OM", "TN", "JO", "HR", "HT", "HU", "HK", "HN", "HM", "VE", "PR", "PS", "PW", "PT", "SJ", "PY", "IQ", "PA", "PF", "PG", "PE", "PK", "PH", "PN", "PL", "PM", "ZM", "EH", "EE", "EG", "ZA", "EC", "IT", "VN", "SB", "ET", "SO", "ZW", "SA", "ES", "ER", "ME", "MD", "MG"]



export default class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            PicUrl: null,
            RandomCountryCode: null,
            isLoading: true,
            countryName: null,
            optionOne: null,
            optionTwo: null,
            optionThree: null,
            optionDecider: null,
            wrongCountryCode_1: null,
            wrongCountryCode_2: null,
            wrongCountryName_1: null,
            wrongCountryName_2: null,
            RightAnswer: false,
            WrongAnswer: false,
            errorAlert: false,
            score: Number(localStorage.getItem("score")),
        }
    }

    async componentDidMount() {
        this.getFlagCode()
        this.getWrongFlagCode_1()
        this.getWrongFlagCode_2()

    }


    getFlagCode = () => {
        this.setState({ isLoading: true })
        let min = 0
        let max = 100
        min = Math.ceil(min);
        max = Math.floor(max);
        this.setState({ RandomCountryCode: Math.floor(Math.random() * (max - min) + min) })

        setTimeout(() => {
            this.getImage()
        }, 1000);
    }

    getWrongFlagCode_1 = () => {

        let min = 0
        let max = 100
        min = Math.ceil(min);
        max = Math.floor(max);
        this.setState({ wrongCountryCode_1: Math.floor(Math.random() * (max - min) + min) })

        setTimeout(() => {
            this.wrongCountryName_1Func()
        }, 1000);
    }

    getWrongFlagCode_2 = () => {

        let min = 0
        let max = 100
        min = Math.ceil(min);
        max = Math.floor(max);
        this.setState({ wrongCountryCode_2: Math.floor(Math.random() * (max - min) + min) })

        setTimeout(() => {
            this.wrongCountryName_2Func()
        }, 1000);
    }

    wrongCountryName_1Func = async () => {
        try {
            let Nameurl = await fetch(
                `https://restcountries.com/v3.1/alpha/${countryName[this.state.wrongCountryCode_1]}`
            );
            let Namedata = await Nameurl.json()
            this.setState({ wrongCountryName_1: Namedata[0].name.common })
            this.setState({ isLoading: false })

            setTimeout(() => {
                this.showAnswer()
            }, 500);
        }
        catch {
            this.setState({ errorAlert: true })
            setTimeout(() => {
                this.setState({ ererrorAlertror: false })
                window.location.reload(false)
            }, 1000);
        }
    }
    wrongCountryName_2Func = async () => {
        try {
            let Nameurl = await fetch(
                `https://restcountries.com/v3.1/alpha/${countryName[this.state.wrongCountryCode_2]}`
            );
            let Namedata = await Nameurl.json()
            this.setState({ wrongCountryName_2: Namedata[0].name.common })
            this.setState({ isLoading: false })

            setTimeout(() => {
                this.showAnswer()
            }, 500);
        }
        catch {
            this.setState({ errorAlert: true })
            setTimeout(() => {
                this.setState({ ererrorAlertror: false })
                window.location.reload(false)
            }, 1000);

        }
    }


    getImage = async () => {
        try {

            let Flagurl = await fetch(
                `https://countryflagsapi.com/png/${countryName[this.state.RandomCountryCode]}`
            );
            const imageBlob = await Flagurl.blob();
            const imageObjectURL = URL.createObjectURL(imageBlob);
            this.setState({ PicUrl: imageObjectURL })
            let Nameurl = await fetch(
                `https://restcountries.com/v3.1/alpha/${countryName[this.state.RandomCountryCode]}`
            );
            let Namedata = await Nameurl.json()
            this.setState({ countryName: Namedata[0].name.common })
            this.setState({ isLoading: false })

            setTimeout(() => {
                this.showAnswer()
            }, 500);
        }
        catch {
            this.setState({ errorAlert: true })
            setTimeout(() => {
                this.setState({ ererrorAlertror: false })
                window.location.reload(false)
            }, 1000);

        }
    }
    showAnswer = () => {

        this.setState({ optionDecider: Math.random() })

        setTimeout(() => {
            if (this.state.optionDecider <= 0.33) {
                this.setState({ optionOne: this.state.countryName })
                this.setState({ optionTwo: this.state.wrongCountryName_1 })
                this.setState({ optionThree: this.state.wrongCountryName_2 })
            }
            else if (this.state.optionDecider > 0.33 && this.state.optionDecider <= 0.57) {
                this.setState({ optionTwo: this.state.countryName })
                this.setState({ optionOne: this.state.wrongCountryName_1 })
                this.setState({ optionThree: this.state.wrongCountryName_2 })
            }
            else if (this.state.optionDecider > 0.57) {
                this.setState({ optionThree: this.state.countryName })
                this.setState({ optionOne: this.state.wrongCountryName_1 })
                this.setState({ optionTwo: this.state.wrongCountryName_2 })
            }
        }, 500);
    }

    optionOneFunc = () => {
        if (this.state.optionDecider <= 0.33) {
            this.setState({ RightAnswer: true })

            if (navigator){
                navigator.vibrate([100, 100, 100])
            }

            this.setState({ score: this.state.score + 1 })
            localStorage.setItem("score", this.state.score.toString())
            setTimeout(() => {
                this.setState({ RightAnswer: false })
                this.getFlagCode()
                this.getWrongFlagCode_1()
                this.getWrongFlagCode_2()


            }, 2000);
        }
        else {
            this.setState({ WrongAnswer: true })
            setTimeout(() => {
                this.setState({ WrongAnswer: false })

            }, 1000);
        }
    }
    optionTwoFunc = () => {
        if (this.state.optionDecider > 0.33 && this.state.optionDecider <= 0.57) {
            this.setState({ RightAnswer: true })
            if (navigator){
                navigator.vibrate([100, 100, 100])
            }
            this.setState({ score: this.state.score + 1 })
            localStorage.setItem("score", this.state.score.toString())
            setTimeout(() => {
                this.setState({ RightAnswer: false })
                this.getFlagCode()
                this.getWrongFlagCode_1()
                this.getWrongFlagCode_2()


            }, 2000);

        }
        else {
            this.setState({ WrongAnswer: true })
            setTimeout(() => {
                this.setState({ WrongAnswer: false })

            }, 1000);
        }
    }
    optionThreeFunc = () => {
        if (this.state.optionDecider > 0.57) {
            this.setState({ RightAnswer: true })
            if (navigator){
                navigator.vibrate([100, 100, 100])
            }
            this.setState({ score: this.state.score + 1 })
            localStorage.setItem("score", this.state.score.toString())
            setTimeout(() => {
                this.setState({ RightAnswer: false })
                this.getFlagCode()
                this.getWrongFlagCode_1()
                this.getWrongFlagCode_2()


            }, 2000);

        }
        else {
            this.setState({ WrongAnswer: true })
            setTimeout(() => {
                this.setState({ WrongAnswer: false })

            }, 1000);
        }
    }

    render() {
        return (
            <>
                <div className="main text-center py-3">
                    <h1 className='fs-2 my-3'>
                        <strong>
                            Welcome to The Flag Mania <a href="mailto:contactpiyushhere@gmail.com"  target="_blank" rel="noreferrer">
                                <i class="fa fa-envelope-square" aria-hidden="true"></i>
                            </a>
                        </strong>
                    </h1>

                    {this.state.WrongAnswer &&
                        <div class="alert alert-danger" role="alert">
                            <strong>
                                Your answer is wrong!
                            </strong>
                        </div>}

                    {this.state.RightAnswer &&
                        <div class="alert alert-primary" role="alert">
                            <strong>
                                Yayy!! That is the correct answer.. Going to next question..
                            </strong>
                        </div>}

                    {this.state.errorAlert &&
                        <div class="error Alert" style={{ "textAlign": "center", "color": "red", "backgroundColor": "lightblue", "padding": "7px", "width": "fit-content", "margin": "Auto" }} role="alert">
                            <strong>
                                <h5>
                                    We faced a issue while loading. Auto refreshing the page..
                                </h5>
                            </strong>
                        </div>}


                    {this.state.isLoading
                        ? <div className="spinContainer">
                            <div className="spinner-border text-primary" role="status">
                            </div>
                            <div>
                                <strong>
                                    Loading flag... This may take few seconds.
                                </strong>
                            </div>
                        </div>
                        : <div className='text-center my-5'>
                            <div className="container" style={{ "width": "45vh" }} >
                                <img src={this.state.PicUrl} className="card-img-top border border-dark border-5" alt="" />
                            </div>
                        </div>}

                    {!this.state.isLoading && !this.state.RightAnswer && <div className="text-center my-5">
                        <div className="container">
                            <div className="row">
                                <div className="btn col mx-5 my-1 py-3 btn-dark" onClick={this.optionOneFunc}>
                                    <strong>
                                        <div className="fs-4">
                                            {this.state.optionOne}
                                        </div>
                                    </strong>
                                </div>

                                <div className="btn col mx-5 my-1 py-3 btn-dark" onClick={this.optionTwoFunc}>
                                    <strong>
                                        <div className="fs-5">
                                            {this.state.optionTwo}
                                        </div>
                                    </strong>
                                </div>
                                <div className="btn col mx-5 my-1 py-3 btn-dark" onClick={this.optionThreeFunc}>
                                    <strong>
                                        <div className="fs-5">
                                            {this.state.optionThree}
                                        </div>
                                    </strong>
                                </div>

                                <div className="score text-center text-dark my-3">
                                    <div className="container bg-white py-1" style={{ "width": "fit-content" }}>

                                        <strong>
                                            score : {localStorage.getItem("score")}
                                        </strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}
                </div>

            </>
        )
    }
}
