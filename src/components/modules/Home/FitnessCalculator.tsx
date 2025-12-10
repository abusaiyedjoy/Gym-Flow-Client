"use client";
import React, { useState } from 'react';
import { X, Download, Activity, Heart, Droplet, Target, TrendingUp, Scale, Ruler, Calendar, User, HeartPlus } from 'lucide-react';

interface FitnessResults {
  bmi: number;
  bmiCategory: string;
  bmr: number;
  dailyCalories: number;
  waterIntake: number;
  idealWeight: { min: number; max: number };
  macros: {
    protein: number;
    carbs: number;
    fats: number;
  };
  bodyFat?: number;
}

const FitnessCalculator: React.FC = () => {
  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [height, setHeight] = useState('');
  const [heightUnit, setHeightUnit] = useState('cm');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [activityLevel, setActivityLevel] = useState('moderate');
  const [goal, setGoal] = useState('maintain');
  const [showModal, setShowModal] = useState(false);
  const [results, setResults] = useState<FitnessResults | null>(null);

  const convertToKg = (weight: number, unit: string): number => {
    return unit === 'lbs' ? weight * 0.453592 : weight;
  };

  const convertToCm = (height: number, unit: string): number => {
    return unit === 'inch' ? height * 2.54 : height;
  };

  const calculateBMI = (weightKg: number, heightCm: number): number => {
    const heightM = heightCm / 100;
    return weightKg / (heightM * heightM);
  };

  const getBMICategory = (bmi: number): string => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal Weight';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
  };

  const calculateIdealWeight = (heightCm: number, isMale: boolean): { min: number; max: number } => {
    const heightM = heightCm / 100;
    const min = Math.round(18.5 * heightM * heightM);
    const max = Math.round(24.9 * heightM * heightM);
    return { min, max };
  };

  const calculateBMR = (weightKg: number, heightCm: number, ageYears: number, isMale: boolean): number => {
    if (isMale) {
      return 88.362 + (13.397 * weightKg) + (4.799 * heightCm) - (5.677 * ageYears);
    } else {
      return 447.593 + (9.247 * weightKg) + (3.098 * heightCm) - (4.330 * ageYears);
    }
  };

  const getActivityMultiplier = (level: string): number => {
    const multipliers: { [key: string]: number } = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9,
    };
    return multipliers[level] || 1.55;
  };

  const calculateMacros = (calories: number, goal: string) => {
    let proteinRatio = 0.3, carbsRatio = 0.5, fatsRatio = 0.2;
    
    if (goal === 'lose') {
      proteinRatio = 0.4;
      carbsRatio = 0.35;
      fatsRatio = 0.25;
    } else if (goal === 'gain') {
      proteinRatio = 0.3;
      carbsRatio = 0.5;
      fatsRatio = 0.2;
    }

    return {
      protein: Math.round((calories * proteinRatio) / 4),
      carbs: Math.round((calories * carbsRatio) / 4),
      fats: Math.round((calories * fatsRatio) / 9),
    };
  };

  const estimateBodyFat = (bmi: number, age: number, isMale: boolean): number => {
    if (isMale) {
      return Math.round((1.20 * bmi + 0.23 * age - 16.2) * 10) / 10;
    } else {
      return Math.round((1.20 * bmi + 0.23 * age - 5.4) * 10) / 10;
    }
  };

  const handleCalculate = () => {
    const weightValue = parseFloat(weight);
    const heightValue = parseFloat(height);
    const ageYears = parseFloat(age);

    if (!weightValue || !heightValue || !ageYears) {
      alert('Please fill in all fields');
      return;
    }

    const weightKg = convertToKg(weightValue, weightUnit);
    const heightCm = convertToCm(heightValue, heightUnit);

    const bmi = calculateBMI(weightKg, heightCm);
    const bmiCategory = getBMICategory(bmi);
    const bmr = calculateBMR(weightKg, heightCm, ageYears, gender === 'male');
    const activityMultiplier = getActivityMultiplier(activityLevel);
    let dailyCalories = Math.round(bmr * activityMultiplier);
    
    if (goal === 'lose') dailyCalories -= 500;
    if (goal === 'gain') dailyCalories += 500;

    const waterIntake = Math.round((weightKg * 0.033) * 100) / 100;
    const macros = calculateMacros(dailyCalories, goal);
    const idealWeight = calculateIdealWeight(heightCm, gender === 'male');
    const bodyFat = estimateBodyFat(bmi, ageYears, gender === 'male');

    setResults({
      bmi: Math.round(bmi * 10) / 10,
      bmiCategory,
      bmr: Math.round(bmr),
      dailyCalories,
      waterIntake,
      idealWeight,
      macros,
      bodyFat,
    });

    setShowModal(true);
  };

const downloadReport = () => {
  if (!results) return;

  const canvas = document.createElement('canvas');
  canvas.width = 800;
  canvas.height = 1100;
  const ctx = canvas.getContext('2d');

  if (!ctx) return;

  // ==== BACKGROUND ====
  ctx.fillStyle = '#121212';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // ==== TOP GRADIENT HEADER ====
  const headerGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
  headerGradient.addColorStop(0, '#ff3b2f');  // red
  headerGradient.addColorStop(1, '#f97316');  // orange
  ctx.fillStyle = headerGradient;
  ctx.fillRect(0, 0, canvas.width, 130);

  // ==== TITLE ====
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 40px Arial';
  ctx.fillText('GymFlow', 50, 65);

  ctx.font = '22px Arial';
  ctx.fillStyle = '#ffe7d1';
  ctx.fillText('Your Personalized Fitness Report', 50, 105);

  // ==== SECTION TITLE ====
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 26px Arial';
  ctx.fillText('Health Metrics', 50, 170);

  // ==== METRICS ====
  const metrics = [
    { label: 'BMI', value: `${results.bmi} (${results.bmiCategory})`, y: 220 },
    { label: 'BMR', value: `${results.bmr} calories/day`, y: 270 },
    { label: 'Daily Calories', value: `${results.dailyCalories} calories`, y: 320 },
    { label: 'Body Fat', value: `${results.bodyFat}%`, y: 370 },
    { label: 'Water Intake', value: `${results.waterIntake} liters/day`, y: 420 },
    { label: 'Ideal Weight Range', value: `${results.idealWeight.min}-${results.idealWeight.max} kg`, y: 470 },
  ];

  ctx.font = '20px Arial';
  metrics.forEach(metric => {
    // orange-red gradient for labels
    const labelGrad = ctx.createLinearGradient(0, 0, 200, 0);
    labelGrad.addColorStop(0, '#ff3b2f');
    labelGrad.addColorStop(1, '#f97316');

    ctx.fillStyle = labelGrad;
    ctx.fillText(metric.label + ':', 50, metric.y);

    ctx.fillStyle = '#ffffff';
    ctx.fillText(metric.value, 300, metric.y);
  });

  // ==== MACROS TITLE ====
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 26px Arial';
  ctx.fillText('Recommended Macros', 50, 550);

  // ==== MACROS ====
  const macroLabels = [
    { label: 'Protein', value: `${results.macros.protein}g`, y: 600 },
    { label: 'Carbohydrates', value: `${results.macros.carbs}g`, y: 650 },
    { label: 'Fats', value: `${results.macros.fats}g`, y: 700 },
  ];

  ctx.font = '20px Arial';
  macroLabels.forEach(macro => {
    const macroGrad = ctx.createLinearGradient(0, 0, 200, 0);
    macroGrad.addColorStop(0, '#ff3b2f');
    macroGrad.addColorStop(1, '#f97316');

    ctx.fillStyle = macroGrad;
    ctx.fillText(macro.label + ':', 50, macro.y);

    ctx.fillStyle = '#ffffff';
    ctx.fillText(macro.value, 300, macro.y);
  });

  // ==== FOOTER GRADIENT BAR ====
  const footerGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
  footerGradient.addColorStop(0, '#ff3b2f');
  footerGradient.addColorStop(1, '#f97316');
  ctx.fillStyle = footerGradient;

  ctx.fillRect(0, canvas.height - 80, canvas.width, 80);

  // ==== FOOTER TEXT ====
  ctx.fillStyle = '#ffffff';
  ctx.font = '16px Arial';
  ctx.fillText('Generated by GymFlow - Your Fitness Partner', 50, canvas.height - 45);
  ctx.fillText(new Date().toLocaleDateString(), 50, canvas.height - 20);

  // ==== DOWNLOAD ====
  canvas.toBlob((blob) => {
    if (blob) {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'fitness-report.png';
      link.click();
      URL.revokeObjectURL(url);
    }
  });
};


  return (
    <div className="min-h-screen relative text-white py-16 px-4 bg-linear-to-br from-zinc-950 via-zinc-900 to-zinc-950 overflow-hidden"
    >{/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />
      <div className={`max-w-7xl mx-auto transition-all duration-300 ${showModal ? 'blur-sm' : ''}`}>
        <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-full text-orange-400 text-sm font-medium mb-6 backdrop-blur-sm">
            <HeartPlus className="w-4 h-4" />
            <span>Get Health Report </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Fitness{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-red-600">
              Calculator
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Get personalized insights about your health and fitness goals
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Info Cards */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-2xl p-8 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-linear-to-r from-orange-400 to-red-600 rounded-xl flex items-center justify-center">
                  <Activity className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold">BMI Categories</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-black/30 rounded-lg">
                  <span className="text-gray-300">Below 18.5</span>
                  <span className="text-blue-400 font-semibold">Underweight</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-black/30 rounded-lg">
                  <span className="text-gray-300">18.5 - 24.9</span>
                  <span className="text-green-400 font-semibold">Normal Weight</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-black/30 rounded-lg">
                  <span className="text-gray-300">25.0 - 29.9</span>
                  <span className="text-yellow-400 font-semibold">Overweight</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-black/30 rounded-lg">
                  <span className="text-gray-300">30.0 & Above</span>
                  <span className="text-red-400 font-semibold">Obese</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-8 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-bold">Why Track Your Health?</h2>
              </div>
              
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>Monitor your body composition and weight trends</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>Optimize your nutrition and calorie intake</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>Set realistic fitness goals based on data</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>Track progress towards your ideal weight</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Side - Calculator Form */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-2xl p-8 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-linear-to-r from-orange-400 to-red-600 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold">Calculate Your Metrics</h2>
            </div>

            <div className="space-y-5">
              {/* Weight */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Weight</label>
                <div className="grid grid-cols-[1fr_120px] gap-3">
                  <div className="relative">
                    <Scale className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="number"
                      placeholder="Enter weight"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      className="w-full bg-black/50 border border-gray-600 rounded-lg pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>
                  <select
                    value={weightUnit}
                    onChange={(e) => setWeightUnit(e.target.value)}
                    className="bg-black/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
                  >
                    <option value="kg" className="bg-gray-900">kg</option>
                    <option value="lbs" className="bg-gray-900">lbs</option>
                  </select>
                </div>
              </div>

              {/* Height */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Height</label>
                <div className="grid grid-cols-[1fr_120px] gap-3">
                  <div className="relative">
                    <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="number"
                      placeholder="Enter height"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="w-full bg-black/50 border border-gray-600 rounded-lg pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>
                  <select
                    value={heightUnit}
                    onChange={(e) => setHeightUnit(e.target.value)}
                    className="bg-black/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
                  >
                    <option value="cm" className="bg-gray-900">cm</option>
                    <option value="inch" className="bg-gray-900">inch</option>
                  </select>
                </div>
              </div>

              {/* Age and Gender */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Age</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="number"
                      placeholder="Your age"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="w-full bg-black/50 border border-gray-600 rounded-lg pl-11 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Gender</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full bg-black/50 border border-gray-600 rounded-lg pl-11 pr-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors appearance-none"
                    >
                      <option value="male" className="bg-gray-900">Male</option>
                      <option value="female" className="bg-gray-900">Female</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Activity Level */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Activity Level</label>
                <div className="relative">
                  <TrendingUp className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <select
                    value={activityLevel}
                    onChange={(e) => setActivityLevel(e.target.value)}
                    className="w-full bg-black/50 border border-gray-600 rounded-lg pl-11 pr-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors appearance-none"
                  >
                    <option value="sedentary" className="bg-gray-900">Sedentary (little or no exercise)</option>
                    <option value="light" className="bg-gray-900">Light (1-3 days/week)</option>
                    <option value="moderate" className="bg-gray-900">Moderate (3-5 days/week)</option>
                    <option value="active" className="bg-gray-900">Active (6-7 days/week)</option>
                    <option value="veryActive" className="bg-gray-900">Very Active (intense daily)</option>
                  </select>
                </div>
              </div>

              {/* Goal */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Fitness Goal</label>
                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full bg-black/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
                >
                  <option value="lose" className="bg-gray-900">Lose Weight</option>
                  <option value="maintain" className="bg-gray-900">Maintain Weight</option>
                  <option value="gain" className="bg-gray-900">Gain Weight</option>
                </select>
              </div>

              <button
                onClick={handleCalculate}
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-4 rounded-lg font-bold text-lg hover:from-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-orange-500/30"
              >
                Calculate Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Modal */}
      {showModal && results && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-orange-500 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-red-600 p-6 flex items-center justify-between rounded-t-2xl">
              <div>
                <h2 className="text-3xl font-bold text-white">Your Fitness Report</h2>
                <p className="text-orange-100 text-sm mt-1">Personalized health insights</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="p-8">
              {/* Main Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-xl p-5 text-center">
                  <Activity className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-400 mb-1">BMI</div>
                  <div className="text-2xl font-bold text-white">{results.bmi}</div>
                  <div className="text-xs text-blue-400 mt-1">{results.bmiCategory}</div>
                </div>
                <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 rounded-xl p-5 text-center">
                  <Heart className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-400 mb-1">BMR</div>
                  <div className="text-2xl font-bold text-white">{results.bmr}</div>
                  <div className="text-xs text-green-400 mt-1">cal/day</div>
                </div>
                <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-xl p-5 text-center">
                  <Target className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-400 mb-1">Daily Calories</div>
                  <div className="text-2xl font-bold text-white">{results.dailyCalories}</div>
                  <div className="text-xs text-purple-400 mt-1">calories</div>
                </div>
                <div className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 border border-cyan-500/30 rounded-xl p-5 text-center">
                  <Droplet className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-400 mb-1">Water</div>
                  <div className="text-2xl font-bold text-white">{results.waterIntake}</div>
                  <div className="text-xs text-cyan-400 mt-1">liters/day</div>
                </div>
              </div>

              {/* Additional Metrics */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Scale className="w-5 h-5 text-orange-500" />
                    Body Composition
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Body Fat</span>
                      <span className="text-white font-semibold">{results.bodyFat}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Ideal Weight Range</span>
                      <span className="text-white font-semibold">{results.idealWeight.min}-{results.idealWeight.max} kg</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-orange-500" />
                    Recommended Macros
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Protein</span>
                      <span className="text-white font-semibold">{results.macros.protein}g</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Carbohydrates</span>
                      <span className="text-white font-semibold">{results.macros.carbs}g</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Fats</span>
                      <span className="text-white font-semibold">{results.macros.fats}g</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Macro Distribution Visual */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-bold text-white mb-4">Macro Distribution</h3>
                <div className="flex gap-2 h-8 rounded-lg overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold"
                    style={{ width: '30%' }}
                  >
                    Protein
                  </div>
                  <div 
                    className="bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center text-white text-xs font-bold"
                    style={{ width: '50%' }}
                  >
                    Carbs
                  </div>
                  <div 
                    className="bg-gradient-to-r from-cyan-500 to-cyan-600 flex items-center justify-center text-white text-xs font-bold"
                    style={{ width: '20%' }}
                  >
                    Fats
                  </div>
                </div>
              </div>

              <button
                onClick={downloadReport}
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-4 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download Health Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FitnessCalculator;