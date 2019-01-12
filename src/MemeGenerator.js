import React from 'react';


class MemeGenerator extends React.Component {
    constructor(){
        super()
        this.state = {
            memeText: "",
            randomPic : "http://i.imgflip.com/1bij.jpg",
            allMemePics : []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    
    componentDidMount(){
        fetch("https://api.imgflip.com/get_memes")
        .then(response => response.json())
        .then(response => {
            const {memes} = response.data
            console.log(memes)
            this.setState({allMemePics: memes})
        })
    }

    handleChange(ev){
       const {name, value} = ev.target
       this.setState({[name] : value})
    }


    handleSubmit(ev){
       ev.preventDefault()
       const randNum = Math.floor(Math.random() * this.state.allMemePics.length)
       this.setState({randomPic: this.state.allMemePics[randNum].url, memeText: ''})
    }

    render() {
        return (
            <div>
                <form className="meme-form" onSubmit={this.handleSubmit}>
                    
                    <input 
                        type="text"
                        name="memeText"
                        placeholder="Meme Text"
                        value={this.state.memeText}
                        onChange ={this.handleChange}
                        maxlength="50"/> 
                
                    <button>NEW</button>

                </form>
                <div className="meme">
                    <img src={this.state.randomPic} alt="" />
                    <h2 className="bottom">{this.state.memeText}</h2>
                </div>
            </div>
        )
    }
}

export default MemeGenerator