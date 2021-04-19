import React, { Component } from 'react';
import { View, Text, TextInput, TouchableNativeFeedback, ScrollView } from 'react-native';
import { pagAluno, app } from '../../styles/index.js';
import TbNotas from '../../my_db/TbNotas';
import UpNotas from '../../model/UpNotas.js';
import { Picker } from '@react-native-picker/picker';

export default class PagNota extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disciplina: '',
            nota: '',
            bimestre: '',
            mensagem: '',
            c: 1
        };
    }

    alterarNotas(disciplina, nota, bimestre) {
        const { idNotas } = this.props.route.params;
        if (nota.trim()) {
            this.setState({ mensagem: 'Notas modificadas', c: 0 })
            const db = new TbNotas();
            const notas = new UpNotas(disciplina, nota, bimestre);
            db.atualizarNotas(idNotas, notas);
        }
        else {
            this.setState({ mensagem: 'Alguma coisa aqui deve ser preenchida!', c: 1 })
        }
    }
    render() {
        const { nomeAluno, disciplina } = this.props.route.params;
        return (
            <ScrollView>
                <View style={app.pagina}>
                    <View style={app.conteine}>
                        <View style={pagAluno.margin}>
                            <View style={pagAluno.select}>
                                <Picker
                                    selectedValue={disciplina}
                                    onValueChange={(item) => this.setState({ disciplina: item })}>
                                    <Picker.Item label={'Artes'} value={'Artes'} />
                                    <Picker.Item label={'Biologia'} value={'Biologia'} />
                                    <Picker.Item label={'Educação Física'} value={'Educação Física'} />
                                    <Picker.Item label={'Filosofia'} value={'Filosofia'} />
                                    <Picker.Item label={'Física'} value={'Física'} />
                                    <Picker.Item label={'Geografia'} value={'Geografia'} />
                                    <Picker.Item label={'História'} value={'História'} />
                                    <Picker.Item label={'Inglês'} value={'Inglês'} />
                                    <Picker.Item label={'Português/Literatura'} value={'Português/Literatura'} />
                                    <Picker.Item label={'Matemática'} value={'Matemática'} />
                                    <Picker.Item label={'Química'} value={'Química'} />
                                    <Picker.Item label={'Sociologia'} value={'Sociologia'} />
                                </Picker>
                            </View>
                            <View style={pagAluno.campos}>
                                <Text>Nota:</Text>
                                <TextInput
                                    style={pagAluno.input}
                                    keyboardType="numeric"
                                    placeholder="Informe a nota"
                                    maxLength={3}
                                    onChangeText={(n) => this.setState({ nota: n })}
                                />
                            </View>
                            <View style={pagAluno.campos}>
                                <Text>Bimestre:</Text>
                                <TextInput
                                    style={pagAluno.input}
                                    keyboardType="numeric"
                                    placeholder="Informe o bimestre"
                                    maxLength={1}
                                    onChangeText={(b) => this.setState({ bimestre: b })}
                                />
                            </View>

                            <TouchableNativeFeedback
                                onPress={() => {
                                    this.alterarNotas(this.state.disciplina, this.state.nota, this.state.bimestre);
                                }}
                                background={
                                    Platform.OS === 'android'
                                        ? TouchableNativeFeedback.SelectableBackground()
                                        : ''
                                }>
                                <View style={pagAluno.botao}>
                                    <Text style={pagAluno.botaoText}>
                                        {"Modificar notas de: " + nomeAluno}
                                        {Platform.OS !== 'android' ? '(Android only)' : ''}
                                    </Text>
                                </View>
                            </TouchableNativeFeedback>
                            <Text style={(this.state.c) ? app.error : app.sucesso}>{this.state.mensagem}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}
