import React, { Component } from 'react';
import { View, Text, TextInput, TouchableNativeFeedback, ScrollView } from 'react-native';
import { Toast, Root } from "native-base";
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
        };
    }

    alterarNotas(disciplina, nota, bimestre) {
        const { idNotas } = this.props.route.params;
        if (nota.trim()) {
            const db = new TbNotas();
            const notas = new UpNotas(disciplina, nota, bimestre);
            db.atualizarNotas(idNotas, notas);
            Toast.show({
                text: 'Notas modificadas',
                buttonText: 'OK',
                duration: 10000,
                type: 'success'
            })
        }
        else {
            Toast.show({
                text: 'Alguma coisa aqui deve ser preenchida!',
                buttonText: 'OK',
                duration: 10000,
                type: 'danger'
            })
        }
    }
    render() {
        const { nomeAluno, disciplina } = this.props.route.params;
        return (
            <Root>
                <ScrollView>
                    <View style={app.pagina}>
                        <View style={app.conteine}>
                            <View style={pagAluno.margin}>
                                <View style={pagAluno.select}>
                                    <Picker
                                        style={pagAluno.picker}
                                        selectedValue={disciplina}
                                        onValueChange={(item) => this.setState({ disciplina: item })}>
                                        <Picker.Item label={'Artes'} value={'Artes'} />
                                        <Picker.Item label={'Biologia'} value={'Biologia'} />
                                        <Picker.Item label={'Educa????o F??sica'} value={'Educa????o F??sica'} />
                                        <Picker.Item label={'Filosofia'} value={'Filosofia'} />
                                        <Picker.Item label={'F??sica'} value={'F??sica'} />
                                        <Picker.Item label={'Geografia'} value={'Geografia'} />
                                        <Picker.Item label={'Hist??ria'} value={'Hist??ria'} />
                                        <Picker.Item label={'Ingl??s'} value={'Ingl??s'} />
                                        <Picker.Item label={'Portugu??s/Literatura'} value={'Portugu??s/Literatura'} />
                                        <Picker.Item label={'Matem??tica'} value={'Matem??tica'} />
                                        <Picker.Item label={'Qu??mica'} value={'Qu??mica'} />
                                        <Picker.Item label={'Sociologia'} value={'Sociologia'} />
                                    </Picker>
                                </View>
                                <View style={pagAluno.campos}>
                                    <Text style={pagAluno.titleInput}>Nota:</Text>
                                    <TextInput
                                        style={pagAluno.input}
                                        keyboardType="numeric"
                                        placeholder="Informe a nota"
                                        maxLength={3}
                                        onChangeText={(n) => this.setState({ nota: n })}
                                    />
                                </View>
                                <View style={pagAluno.campos}>
                                    <Text style={pagAluno.titleInput}>Bimestre:</Text>
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
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </Root>
        );
    }
}
