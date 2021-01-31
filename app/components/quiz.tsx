import * as React from 'react';
import { StyleSheet, View, Image, ImageBackground, Button } from 'react-native';
import { Card } from 'react-native-elements';
import { RadioButton } from 'react-native-paper';
import example from '../components/quiz.json'; // Example data set

const base64 = 'data:image/png;base64,'


export default class Quiz extends React.Component {
    state = {
        data: example, // Temporary, change it to actual data sent when that's set up 
        value: '',
        activeBgColor: "black",
        score: 0,
        selected: "",
        questionIndex: 0,
    }

    constructor(props: any) {
        super(props);
    }
    nextQuestion(value: string) {
        if(value == undefined)
        {
            return
        }
        if(value == this.state.data[this.state.questionIndex].translation) 
        {
            this.setState({
                activeBgColor: "green",
                score:this.state.score+1,
                questionIndex:this.state.questionIndex+1,
                selected: undefined
            });
                
        }
            else {
           this.setState({
                 activeBgColor: "red",
                 questionIndex:this.state.questionIndex+1,
                 selected: undefined
           });
        }
    }
        


    help = (value: any) => {
        this.setState({selected: value})
        console.log(value)
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Card containerStyle={{ flex: 1, justifyContent: 'center' }}>
                    <Card.Title>What is "{this.state.data[this.state.questionIndex].label}" in {this.state.data[this.state.questionIndex].translationLanguage}?</Card.Title>
                    <Card.Divider />

                    <Card.Image  style={style.image} source={{ uri: base64.concat(this.state.data[this.state.questionIndex].image) }}></Card.Image>

                    <View>
                        <RadioButton.Group onValueChange={value => this.setState({ value: value })} value={this.state.value}>
                            <RadioButton.Item

                                label={this.state.data[this.state.questionIndex].wordChoices[0]}

                                value="first" style={style.choices}
                                labelStyle={style.labelChoices}
                                uncheckedColor="#000"
                                color={this.state.activeBgColor}
                                onPress={() => this.help(this.state.data[this.state.questionIndex].wordChoices[0])}
                            //onChange={(value) => {return this.changeStyle(value);}}
                            />

                            <RadioButton.Item
                                label={this.state.data[this.state.questionIndex].wordChoices[1]}
                                value="Second" style={style.choices}
                                labelStyle={style.labelChoices}
                                uncheckedColor="#000"
                                color={this.state.activeBgColor}
                                onPress={() => this.help(this.state.data[this.state.questionIndex].wordChoices[1])}
                            />

                            <RadioButton.Item
                                label={this.state.data[this.state.questionIndex].wordChoices[2]}
                                value="Third" style={style.choices}
                                labelStyle={style.labelChoices}
                                uncheckedColor="#000"
                                color={this.state.activeBgColor}
                                onPress={() => this.help(this.state.data[this.state.questionIndex].wordChoices[2])}
                            />

                            <RadioButton.Item
                                label={this.state.data[this.state.questionIndex].wordChoices[3]}
                                value="Fourth" style={style.choices}
                                labelStyle={style.labelChoices}
                                uncheckedColor="#000"
                                color={this.state.activeBgColor}
                                onPress={() => this.help(this.state.data[this.state.questionIndex].wordChoices[3])}
                            />

                        </RadioButton.Group>
                        <Button title="next" onPress={()=>{this.nextQuestion(this.state.selected)}}/>
                    </View>
                </Card>
            </View>
        );
    }
}

/* @hide const styles = StyleSheet.create({... }); */
const style = StyleSheet.create({
    choices: {
        backgroundColor: "#FFEDF6",
        borderStyle: "solid",
        borderRadius: 20,
        marginBottom: 5,
    },
    labelChoices: {
        color: "#D996B7",
        flex: 1,
    },
    image: {
        height: 380,
        marginBottom: 10,
    },
    buttonStyle: {
        flex: 1
    }
});