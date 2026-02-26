import { ThemedText } from '@/components/themed-text';
import React, { Component } from 'react';
import Countdown, { CountdownApi } from 'react-countdown';
import { Alert, Platform, Pressable } from 'react-native';

interface CountdownExProps {
    qtd: number;
}

export default class CountdownEx extends Component<CountdownExProps> {
    countdownApi: CountdownApi | null = null;
    state = { date: Date.now() + this.props.qtd * 1000 };

    handleStartClick = (): void => {
        this.countdownApi && this.countdownApi.start();
    };

    handleUpdate = (): void => {
        this.forceUpdate();
    };

    showAlert = (message: string): void => {
        if (Platform.OS === 'web') {
            window.alert(message);
        } else {
            Alert.alert(message);
        }
    }

    handleComplete = (): void => {
        this.showAlert("Acabou o descanço!");
        this.forceUpdate();
    };

    setRef = (countdown: Countdown | null): void => {
        if (countdown) {
            this.countdownApi = countdown.getApi();
        }
    };

    isPaused(): boolean {
        return !!(this.countdownApi && this.countdownApi.isPaused());
    }

    isCompleted(): boolean {
        return !!(this.countdownApi && this.countdownApi.isCompleted());
    }

    render() {
        return (
            <>
                <div>
                    <Pressable
                        onPress={this.handleStartClick}
                        disabled={this.isCompleted()}
                        style={{ backgroundColor: '#333', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15)', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 }}
                    >
                        <Countdown
                            key={this.state.date}
                            ref={this.setRef}
                            date={this.state.date}
                            onStart={this.handleUpdate}
                            onComplete={this.handleComplete}
                            autoStart={false}
                            renderer={props =>
                                <ThemedText style={{ fontSize: 10, color: '#888' }}>
                                    {props.minutes}:{props.seconds}
                                </ThemedText>}
                        />
                    </Pressable>
                </div>
            </>
        );
    }
}