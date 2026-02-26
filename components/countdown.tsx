import { ThemedText } from '@/components/themed-text';
import React, { Component } from 'react';
import Countdown, { CountdownApi } from 'react-countdown';
import { Pressable } from 'react-native';
import { Bounce, ToastContainer, toast } from 'react-toastify';

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

    handleComplete = (): void => {
        toast("Acabo o descanço!");
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
                        style={{ backgroundColor: '#333', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 }}
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
                    <ToastContainer 
                        position="bottom-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick={false}
                        rtl={false}
                        pauseOnFocusLoss
                        draggable={false}
                        pauseOnHover={false}
                        theme="dark"
                        transition={Bounce} />
                </div>
            </>
        );
    }
}