import React, { useState } from "react";
import {
    Modal,
    View,
    Text,
    Pressable,
    Image,
} from "react-native";

import { slides, styles } from "./onboardingShared";

export default function OnboardingModal({ visible, onClose }) {
    const [page, setPage] = useState(0);

    const isFirst = page === 0;
    const isLast = page === slides.length - 1;

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.card}>

                    <Pressable onPress={onClose} style={styles.close}>
                        <Text style={{ fontSize: 22 }}>✕</Text>
                    </Pressable>

                    <Image
                        source={require("../assets/logov.png")}
                        style={styles.logo}
                    />

                    <View style={styles.slide}>
                        <Text style={styles.title}>{slides[page].title}</Text>
                        <Text style={styles.subtitle}>{slides[page].subtitle}</Text>
                        <Text style={styles.text}>{slides[page].text}</Text>
                    </View>

                    <View style={styles.dots}>
                        {slides.map((_, i) => (
                            <View
                                key={i}
                                style={[
                                    styles.dot,
                                    page === i && styles.dotActive,
                                ]}
                            />
                        ))}
                    </View>

                    <View style={styles.footer}>
                        {!isFirst && (
                            <Pressable onPress={() => setPage(page - 1)}>
                                <Text style={styles.prev}>Précédent</Text>
                            </Pressable>
                        )}

                        <Pressable
                            onPress={() =>
                                isLast ? onClose() : setPage(page + 1)
                            }
                        >
                            <Text style={styles.next}>
                                {isLast ? "J’ai compris !" : "Suivant"}
                            </Text>
                        </Pressable>
                    </View>

                </View>
            </View>
        </Modal>
    );
}
