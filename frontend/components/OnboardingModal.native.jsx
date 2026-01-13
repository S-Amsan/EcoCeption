import React, { useRef, useState } from "react";
import {
    Modal,
    View,
    Text,
    Pressable,
    Image,
} from "react-native";
import PagerView from "react-native-pager-view";

import { slides, styles } from "./onboardingShared";

export default function OnboardingModal({ visible, onClose }) {
    const [page, setPage] = useState(0);
    const pagerRef = useRef(null);

    const isFirst = page === 0;
    const isLast = page === slides.length - 1;

    const next = () => {
        if (isLast) onClose();
        else pagerRef.current.setPage(page + 1);
    };

    const prev = () => {
        if (!isFirst) pagerRef.current.setPage(page - 1);
    };

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

                    <PagerView
                        ref={pagerRef}
                        style={{ flex: 1 }}
                        onPageSelected={(e) =>
                            setPage(e.nativeEvent.position)
                        }
                    >
                        {slides.map((s, i) => (
                            <View key={i} style={styles.slide}>
                                <Text style={styles.title}>{s.title}</Text>
                                <Text style={styles.subtitle}>{s.subtitle}</Text>
                                <Text style={styles.text}>{s.text}</Text>
                            </View>
                        ))}
                    </PagerView>

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
                            <Pressable onPress={prev}>
                                <Text style={styles.prev}>Précédent</Text>
                            </Pressable>
                        )}

                        <Pressable onPress={next}>
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
