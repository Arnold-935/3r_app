import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Animated,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface QuizQuestion {
  id: string;
  question: string;
  containerColor: string;
  containerIcon: string;
  options: QuizOption[];
  explanation: string;
}

export default function Questions() {
    const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [animatedValue] = useState(new Animated.Value(1));

  const quizQuestions: QuizQuestion[] = [
    {
      id: '1',
      question: 'El contenedor azul de reciclaje es para:',
      containerColor: '#4A90E2',
      containerIcon: '🗂️',
      options: [
        { id: 'a', text: 'Papel y cartón', isCorrect: true },
        { id: 'b', text: 'Vidrio', isCorrect: false },
        { id: 'c', text: 'Orgánicos', isCorrect: false },
      ],
      explanation: '¡Correcto! El contenedor azul es específicamente para papel y cartón. Ayuda a reciclar periódicos, revistas, cajas y documentos.'
    },
    {
      id: '2',
      question: 'El contenedor verde de reciclaje es para:',
      containerColor: '#4CAF50',
      containerIcon: '🍃',
      options: [
        { id: 'a', text: 'Plásticos', isCorrect: false },
        { id: 'b', text: 'Vidrio', isCorrect: true },
        { id: 'c', text: 'Metales', isCorrect: false },
      ],
      explanation: '¡Excelente! El contenedor verde es para vidrio. Botellas, frascos y envases de vidrio van aquí para ser reciclados.'
    },
    {
      id: '3',
      question: 'El contenedor amarillo de reciclaje es para:',
      containerColor: '#FFC107',
      containerIcon: '🥤',
      options: [
        { id: 'a', text: 'Papel', isCorrect: false },
        { id: 'b', text: 'Plásticos y latas', isCorrect: true },
        { id: 'c', text: 'Orgánicos', isCorrect: false },
      ],
      explanation: '¡Perfecto! El contenedor amarillo es para envases de plástico, latas y briks. Ayuda a reciclar botellas, latas de refresco y envases.'
    }
  ];

  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleOptionSelect = (optionId: string) => {
    if (showResult) return;
    
    setSelectedOption(optionId);
    setShowResult(true);
    
    const selectedOptionData = currentQuestion.options.find(opt => opt.id === optionId);
    if (selectedOptionData?.isCorrect) {
      setScore(score + 1);
      
      // Animación de éxito
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1.1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }

    // Mostrar resultado después de un delay
    setTimeout(() => {
      Alert.alert(
        selectedOptionData?.isCorrect ? '¡Correcto! 🎉' : 'Incorrecto 😔',
        currentQuestion.explanation,
        [
          {
            text: currentQuestionIndex < quizQuestions.length - 1 ? 'Siguiente' : 'Ver Resultados',
            onPress: handleNextQuestion
          }
        ]
      );
    }, 1000);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      // Quiz completado
      const percentage = Math.round((score / quizQuestions.length) * 100);
      Alert.alert(
        'Quiz Completado! 🌱',
        `Tu puntuación: ${score}/${quizQuestions.length} (${percentage}%)\n\n${getScoreMessage(percentage)}`,
        [
          { text: 'Reintentar', onPress: resetQuiz },
          { text: 'Volver', onPress: () => router.back() }
        ]
      );
    }
  };

  const getScoreMessage = (percentage: number) => {
    if (percentage === 100) return '¡Perfecto! Eres un experto en reciclaje 🏆';
    if (percentage >= 70) return '¡Muy bien! Tienes buenos conocimientos sobre reciclaje 👍';
    if (percentage >= 50) return 'Bien, pero puedes mejorar. ¡Sigue aprendiendo! 📚';
    return 'Necesitas practicar más. ¡El reciclaje es importante! 🌍';
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setShowResult(false);
    setScore(0);
  };

  const getOptionStyle = (option: QuizOption) => {
    if (!showResult) return styles.option;
    
    if (selectedOption === option.id) {
      return option.isCorrect ? styles.optionCorrect : styles.optionIncorrect;
    }
    
    if (option.isCorrect) {
      return styles.optionCorrect;
    }
    
    return styles.optionDisabled;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#2d5016" barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Quiz de Reciclaje</Text>
        <View style={styles.headerRight}>
          <Text style={styles.questionCounter}>
            {currentQuestionIndex + 1}/{quizQuestions.length}
          </Text>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        <View style={styles.quizPanel}>
          
          {/* Container Illustration */}
          <Animated.View style={[
            styles.containerSection,
            { transform: [{ scale: animatedValue }] }
          ]}>
            <View style={[styles.trashContainer, { backgroundColor: currentQuestion.containerColor }]}>
              <View style={styles.containerLid}>
                <View style={styles.lidHandle} />
              </View>
              <View style={styles.containerBody}>
                <Text style={styles.recycleSymbol}>♻️</Text>
              </View>
            </View>
          </Animated.View>

          {/* Question */}
          <Text style={styles.questionText}>{currentQuestion.question}</Text>

          {/* Options */}
          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={getOptionStyle(option)}
                onPress={() => handleOptionSelect(option.id)}
                disabled={showResult}
                activeOpacity={0.7}
              >
                <Text style={[
                  styles.optionText,
                  showResult && selectedOption === option.id && option.isCorrect && styles.optionTextCorrect,
                  showResult && selectedOption === option.id && !option.isCorrect && styles.optionTextIncorrect,
                ]}>
                  {option.text}
                </Text>
                {showResult && option.isCorrect && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
                {showResult && selectedOption === option.id && !option.isCorrect && (
                  <Text style={styles.crossmark}>✗</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[
                styles.progressFill,
                { width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }
              ]} />
            </View>
            <Text style={styles.scoreText}>Puntuación: {score}/{quizQuestions.length}</Text>
          </View>

        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c8d5b0',
  },
  header: {
    backgroundColor: '#2d5016',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  backButton: {
    padding: 5,
  },
  backIcon: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  questionCounter: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  quizPanel: {
    backgroundColor: '#2d5016',
    borderRadius: 20,
    padding: 25,
    flex: 1,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  containerSection: {
    backgroundColor: '#c8d5b0',
    borderRadius: 15,
    padding: 30,
    alignItems: 'center',
    marginBottom: 25,
  },
  trashContainer: {
    width: 80,
    height: 100,
    borderRadius: 10,
    position: 'relative',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  containerLid: {
    width: 90,
    height: 15,
    backgroundColor: '#2c5aa0',
    borderRadius: 8,
    position: 'absolute',
    top: -7,
    left: -5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lidHandle: {
    width: 20,
    height: 6,
    backgroundColor: '#1e3d6f',
    borderRadius: 3,
  },
  containerBody: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  recycleSymbol: {
    fontSize: 24,
    color: 'white',
  },
  questionText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 24,
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  option: {
    backgroundColor: '#4a6b2a',
    borderRadius: 15,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  optionCorrect: {
    backgroundColor: '#4CAF50',
    borderRadius: 15,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  optionIncorrect: {
    backgroundColor: '#F44336',
    borderRadius: 15,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  optionDisabled: {
    backgroundColor: '#6d6d6d',
    borderRadius: 15,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    opacity: 0.6,
  },
  optionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  optionTextCorrect: {
    fontWeight: 'bold',
  },
  optionTextIncorrect: {
    fontWeight: 'bold',
  },
  checkmark: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  crossmark: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressContainer: {
    marginTop: 20,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  scoreText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
});