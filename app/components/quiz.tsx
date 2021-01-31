import * as React from 'react';
import { StyleSheet, View, Image, ImageBackground, Button, Text } from 'react-native';
import { Card } from 'react-native-elements';
import { RadioButton } from 'react-native-paper';
import example from '../components/quiz.json'; // Example data set

const base64 = 'data:image/png;base64,'


export default class Quiz extends React.Component {
    state = {
        value: '',
        activeBgColor: "black",
        score: 0,
        questionIndex: 0,
    }

    constructor(props: any) {
        super(props);
    }

    nextQuestion() {
        let value = this.state.value;
        if (value == undefined) {
            return
        }
        console.log("SUBMITON2", value);
        if (value == this.props.questions[this.state.questionIndex].translation) {
            this.setState({
                activeBgColor: "green",
                score: this.state.score + 1,
                questionIndex: this.state.questionIndex + 1,
            });

        }
        else {
            this.setState({
                activeBgColor: "red",
                questionIndex: this.state.questionIndex + 1,
            });
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Card containerStyle={{ flex: 1, justifyContent: 'center' }}>
                    {
                        this.state.questionIndex < this.props.questions.length && <>
                            <Card.Title>What is "{this.props.questions[this.state.questionIndex].label}" in {this.props.questions[this.state.questionIndex].translationLanguage}?</Card.Title>
                            <Card.Divider />
                            <Card.Image style={style.image} source={{ uri: base64.concat(this.props.questions[this.state.questionIndex].image) }}></Card.Image>
                            <View>
                                <RadioButton.Group onValueChange={value => this.setState({ value: value })} value={this.state.value}>
                                    <RadioButton.Item
                                        label={this.props.questions[this.state.questionIndex].wordChoices[0]}
                                        value={this.props.questions[this.state.questionIndex].wordChoices[0]} style={style.choices}
                                        labelStyle={style.labelChoices}
                                        uncheckedColor="#000"
                                        color={this.state.activeBgColor}
                                    />

                                    <RadioButton.Item
                                        label={this.props.questions[this.state.questionIndex].wordChoices[1]}
                                        value={this.props.questions[this.state.questionIndex].wordChoices[1]} style={style.choices}
                                        labelStyle={style.labelChoices}
                                        uncheckedColor="#000"
                                        color={this.state.activeBgColor}
                                    />

                                    <RadioButton.Item
                                        label={this.props.questions[this.state.questionIndex].wordChoices[2]}
                                        value={this.props.questions[this.state.questionIndex].wordChoices[2]} style={style.choices}
                                        labelStyle={style.labelChoices}
                                        uncheckedColor="#000"
                                        color={this.state.activeBgColor}
                                    />

                                    <RadioButton.Item
                                        label={this.props.questions[this.state.questionIndex].wordChoices[3]}
                                        value={this.props.questions[this.state.questionIndex].wordChoices[3]} style={style.choices}
                                        labelStyle={style.labelChoices}
                                        uncheckedColor="#000"
                                        color={this.state.activeBgColor}
                                    />

                                </RadioButton.Group>
                                <Button title="next" onPress={() => { this.nextQuestion() }} />
                            </View>
                        </>
                    }
                    {
                        this.state.questionIndex >= this.props.questions.length && <>
                            <View>
                                <Text style={{fontSize: 50, textAlign: "center", marginBottom: 25}}>
                                    You scored {this.state.score} out of {this.props.questions.length}!
                                </Text>
                                <Button title="Done" onPress={() => { this.props.exitQuiz() }} />
                            </View>
                        </>
                    }
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