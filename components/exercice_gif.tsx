import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

interface ExGifProps {
    exercicio: string;
}

export default function ExeciceGif(props: ExGifProps) {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>gif do {props.exercicio}</Text>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.textStyle}>✖️</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
                <Pressable
                    style={[styles.button, styles.buttonOpen]}
                    onPress={() => setModalVisible(true)}>
                    <Text style={styles.textStyle}>❔</Text>
                </Pressable>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: '#959595', // Tom cinza claro (fundo do modal)
        borderRadius: 8,
        padding: 20,
        alignItems: 'center',
    },
    button: {
        borderRadius: 6,
        paddingHorizontal: 4,
        marginLeft: 4,
        boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.15)',
    },
    buttonOpen: {
        backgroundColor: '#4A4A4A',
    },
    buttonClose: {
        backgroundColor: '#383838',
        marginTop: 15,
    },
    textStyle: {
        color: 'white', 
        fontSize: 10,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginTop: 4,
        marginBottom: 8,
        textAlign: 'center',
        color: '#333333',
        fontSize: 16,
    },
});