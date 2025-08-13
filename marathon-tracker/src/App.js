import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle2, Circle, Clock, MapPin, Target, TrendingUp, Award, Save } from 'lucide-react';

const MarathonTrainingApp = () => {
  // Training plan data with distance-based goals
  const trainingPlan = {
    1: {
      week: "Aug 18-24",
      phase: "Holiday Base Building",
      weeklyVolume: "18km",
      days: {
        "Mon": { type: "rest", activity: "Rest (holiday walking counts!)", distance: 0, completed: false, notes: "" },
        "Tue": { type: "easy", activity: "5km easy run (street)", distance: 5, completed: false, notes: "" },
        "Wed": { type: "rest", activity: "Rest", distance: 0, completed: false, notes: "" },
        "Thu": { type: "easy", activity: "6km easy run (street)", distance: 6, completed: false, notes: "" },
        "Fri": { type: "rest", activity: "Rest", distance: 0, completed: false, notes: "" },
        "Sat": { type: "easy", activity: "5km easy run (street)", distance: 5, completed: false, notes: "" },
        "Sun": { type: "rest", activity: "Rest", distance: 0, completed: false, notes: "" }
      }
    },
    2: {
      week: "Aug 25-31",
      phase: "Holiday Base Building", 
      weeklyVolume: "22km",
      days: {
        "Mon": { type: "rest", activity: "Rest", distance: 0, completed: false, notes: "" },
        "Tue": { type: "easy", activity: "6km easy run (street)", distance: 6, completed: false, notes: "" },
        "Wed": { type: "rest", activity: "Rest", distance: 0, completed: false, notes: "" },
        "Thu": { type: "easy", activity: "7km easy run (street)", distance: 7, completed: false, notes: "" },
        "Fri": { type: "rest", activity: "Rest", distance: 0, completed: false, notes: "" },
        "Sat": { type: "easy", activity: "6km easy run (street)", distance: 6, completed: false, notes: "" },
        "Sun": { type: "rest", activity: "Rest", distance: 0, completed: false, notes: "" }
      }
    },
    3: {
      week: "Sep 1-7",
      phase: "Holiday Base Building",
      weeklyVolume: "25km", 
      days: {
        "Mon": { type: "rest", activity: "Rest", distance: 0, completed: false, notes: "" },
        "Tue": { type: "easy", activity: "7km easy run (street)", distance: 7, completed: false, notes: "" },
        "Wed": { type: "cross", activity: "Rest or gentle swimming if available", distance: 0, completed: false, notes: "" },
        "Thu": { type: "easy", activity: "8km easy run (street)", distance: 8, completed: false, notes: "" },
        "Fri": { type: "rest", activity: "Rest", distance: 0, completed: false, notes: "" },
        "Sat": { type: "easy", activity: "7km easy run (street)", distance: 7, completed: false, notes: "" },
        "Sun": { type: "rest", activity: "Rest", distance: 0, completed: false, notes: "" }
      }
    },
    4: {
      week: "Sep 8-14",
      phase: "Holiday Base Building",
      weeklyVolume: "28km",
      days: {
        "Mon": { type: "rest", activity: "Rest", distance: 0, completed: false, notes: "" },
        "Tue": { type: "easy", activity: "8km easy run (street)", distance: 8, completed: false, notes: "" },
        "Wed": { type: "cross", activity: "Rest or cross-training if available", distance: 0, completed: false, notes: "" },
        "Thu": { type: "easy", activity: "9km easy run (street)", distance: 9, completed: false, notes: "" },
        "Fri": { type: "rest", activity: "Rest", distance: 0, completed: false, notes: "" },
        "Sat": { type: "easy", activity: "8km easy run (street)", distance: 8, completed: false, notes: "" },
        "Sun": { type: "rest", activity: "Rest", distance: 0, completed: false, notes: "" }
      }
    },
    5: {
      week: "Sep 15-20",
      phase: "Final Holiday Week",
      weeklyVolume: "30km",
      days: {
        "Mon": { type: "rest", activity: "Rest", distance: 0, completed: false, notes: "" },
        "Tue": { type: "easy", activity: "8km easy run (street)", distance: 8, completed: false, notes: "" },
        "Wed": { type: "rest", activity: "Rest", distance: 0, completed: false, notes: "" },
        "Thu": { type: "easy", activity: "10km easy run (street)", distance: 10, completed: false, notes: "" },
        "Fri": { type: "rest", activity: "Rest (travel day?)", distance: 0, completed: false, notes: "" },
        "Sat": { type: "easy", activity: "8km easy run", distance: 8, completed: false, notes: "" },
        "Sun": { type: "rest", activity: "Rest or travel day", distance: 0, completed: false, notes: "" }
      }
    },
    6: {
      week: "Sep 21-27",
      phase: "Trail Transition",
      weeklyVolume: "35km",
      days: {
        "Mon": { type: "cross", activity: "Rest or 45min cycling", distance: 0, completed: false, notes: "" },
        "Tue": { type: "moderate", activity: "7km road run with 4x 2min gentle hill efforts", distance: 7, completed: false, notes: "" },
        "Wed": { type: "cross", activity: "30min cross-training (swimming/cycling)", distance: 0, completed: false, notes: "" },
        "Thu": { type: "steady", activity: "8km steady road run (conversational pace)", distance: 8, completed: false, notes: "" },
        "Fri": { type: "rest", activity: "Rest", distance: 0, completed: false, notes: "" },
        "Sat": { type: "long", activity: "12km long trail run (practice fueling, technical terrain)", distance: 12, completed: false, notes: "" },
        "Sun": { type: "easy", activity: "5km recovery run (trail or road) or hike", distance: 5, completed: false, notes: "" }
      }
    },
    7: {
      week: "Sep 28-Oct 4",
      phase: "Trail Development",
      weeklyVolume: "40km",
      days: {
        "Mon": { type: "cross", activity: "Rest or 45min cycling", distance: 0, completed: false, notes: "" },
        "Tue": { type: "tempo", activity: "8km road run with 6x 2min tempo efforts", distance: 8, completed: false, notes: "" },
        "Wed": { type: "cross", activity: "40min cross-training", distance: 0, completed: false, notes: "" },
        "Thu": { type: "steady", activity: "9km steady road run", distance: 9, completed: false, notes: "" },
        "Fri": { type: "rest", activity: "Rest or 20min easy walk", distance: 0, completed: false, notes: "" },
        "Sat": { type: "long", activity: "15km long trail run (practice race nutrition, hills)", distance: 15, completed: false, notes: "" },
        "Sun": { type: "easy", activity: "6km easy trail run or hike", distance: 6, completed: false, notes: "" }
      }
    },
    8: {
      week: "Oct 5-11",
      phase: "Building Volume", 
      weeklyVolume: "45km",
      days: {
        "Mon": { type: "cross", activity: "Rest or 50min cycling", distance: 0, completed: false, notes: "" },
        "Tue": { type: "tempo", activity: "9km road run with 8x 2min hill efforts", distance: 9, completed: false, notes: "" },
        "Wed": { type: "cross", activity: "45min cross-training", distance: 0, completed: false, notes: "" },
        "Thu": { type: "steady", activity: "10km steady road run", distance: 10, completed: false, notes: "" },
        "Fri": { type: "rest", activity: "Rest", distance: 0, completed: false, notes: "" },
        "Sat": { type: "long", activity: "18km long trail run (back-to-back training)", distance: 18, completed: false, notes: "" },
        "Sun": { type: "easy", activity: "7km easy trail run (recovery pace)", distance: 7, completed: false, notes: "" }
      }
    },
    9: {
      week: "Oct 12-18",
      phase: "Strength Building",
      weeklyVolume: "48km", 
      days: {
        "Mon": { type: "cross", activity: "Rest or 50min cross-training", distance: 0, completed: false, notes: "" },
        "Tue": { type: "tempo", activity: "10km road run with 5x 4min moderate efforts", distance: 10, completed: false, notes: "" },
        "Wed": { type: "cross", activity: "45min cross-training", distance: 0, completed: false, notes: "" },
        "Thu": { type: "steady", activity: "11km steady road run", distance: 11, completed: false, notes: "" },
        "Fri": { type: "rest", activity: "Rest", distance: 0, completed: false, notes: "" },
        "Sat": { type: "long", activity: "20km long trail run (practice race fueling, hill focus)", distance: 20, completed: false, notes: "" },
        "Sun": { type: "easy", activity: "7km easy trail run (recovery pace)", distance: 7, completed: false, notes: "" }
      }
    },
    10: {
      week: "Oct 19-25",
      phase: "Peak Phase Begins",
      weeklyVolume: "52km",
      days: {
        "Mon": { type: "cross", activity: "Rest or 50min cycling", distance: 0, completed: false, notes: "" },
        "Tue": { type: "tempo", activity: "11km road run with hill/tempo intervals", distance: 11, completed: false, notes: "" },
        "Wed": { type: "cross", activity: "50min cross-training", distance: 0, completed: false, notes: "" },
        "Thu": { type: "steady", activity: "12km steady road run", distance: 12, completed: false, notes: "" },
        "Fri": { type: "rest", activity: "Rest or 20min easy walk", distance: 0, completed: false, notes: "" },
        "Sat": { type: "long", activity: "22km long trail run (longest training run)", distance: 22, completed: false, notes: "" },
        "Sun": { type: "easy", activity: "8km easy trail run (recovery)", distance: 8, completed: false, notes: "" }
      }
    },
    11: {
      week: "Oct 26-Nov 1", 
      phase: "Peak Training",
      weeklyVolume: "55km",
      days: {
        "Mon": { type: "cross", activity: "Rest or cross-training", distance: 0, completed: false, notes: "" },
        "Tue": { type: "tempo", activity: "10km road tempo run", distance: 10, completed: false, notes: "" },
        "Wed": { type: "cross", activity: "45min cross-training", distance: 0, completed: false, notes: "" },
        "Thu": { type: "steady", activity: "13km steady road run", distance: 13, completed: false, notes: "" },
        "Fri": { type: "rest", activity: "Rest", distance: 0, completed: false, notes: "" },
        "Sat": { type: "long", activity: "24km trail run (back-to-back weekend training)", distance: 24, completed: false, notes: "" },
        "Sun": { type: "easy", activity: "10km easy trail run", distance: 10, completed: false, notes: "" }
      }
    },
    12: {
      week: "Nov 2-8",
      phase: "Peak Volume", 
      weeklyVolume: "58km",
      days: {
        "Mon": { type: "cross", activity: "Rest or easy cross-training", distance: 0, completed: false, notes: "" },
        "Tue": { type: "tempo", activity: "12km road run with race-pace efforts", distance: 12, completed: false, notes: "" },
        "Wed": { type: "cross", activity: "50min cross-training", distance: 0, completed: false, notes: "" },
        "Thu": { type: "steady", activity: "14km steady road run", distance: 14, completed: false, notes: "" },
        "Fri": { type: "rest", activity: "Rest", distance: 0, completed: false, notes: "" },
        "Sat": { type: "long", activity: "26km trail run (race simulation)", distance: 26, completed: false, notes: "" },
        "Sun": { type: "easy", activity: "9km easy trail run", distance: 9, completed: false, notes: "" }
      }
    },
    13: {
      week: "Nov 9-15",
      phase: "Final Peak",
      weeklyVolume: "52km",
      days: {
        "Mon": { type: "cross", activity: "Rest or gentle cross-training", distance: 0, completed: false, notes: "" },
        "Tue": { type: "tempo", activity: "10km road run with short race-pace efforts", distance: 10, completed: false, notes: "" },
        "Wed": { type: "cross", activity: "45min cross-training", distance: 0, completed: false, notes: "" },
        "Thu": { type: "steady", activity: "12km steady road run", distance: 12, completed: false, notes: "" },
        "Fri": { type: "rest", activity: "Rest", distance: 0, completed: false, notes: "" },
        "Sat": { type: "long", activity: "24km trail run (final long effort)", distance: 24, completed: false, notes: "" },
        "Sun": { type: "easy", activity: "8km easy trail run", distance: 8, completed: false, notes: "" }
      }
    },
    14: {
      week: "Nov 16-22",
      phase: "Taper Week 1", 
      weeklyVolume: "35km",
      days: {
        "Mon": { type: "cross", activity: "Rest or gentle cross-training", distance: 0, completed: false, notes: "" },
        "Tue": { type: "easy", activity: "7km easy road run with 4x 2min pickups", distance: 7, completed: false, notes: "" },
        "Wed": { type: "cross", activity: "30min cross-training", distance: 0, completed: false, notes: "" },
        "Thu": { type: "easy", activity: "8km easy road run", distance: 8, completed: false, notes: "" },
        "Fri": { type: "rest", activity: "Rest", distance: 0, completed: false, notes: "" },
        "Sat": { type: "long", activity: "15km easy trail run", distance: 15, completed: false, notes: "" },
        "Sun": { type: "easy", activity: "5km easy trail run", distance: 5, completed: false, notes: "" }
      }
    },
    15: {
      week: "Nov 23",
      phase: "RACE WEEK",
      weeklyVolume: "10km + Race", 
      days: {
        "Mon": { type: "rest", activity: "Rest or 3km walk", distance: 0, completed: false, notes: "" },
        "Tue": { type: "easy", activity: "5km easy run with 3x 1min strides", distance: 5, completed: false, notes: "" },
        "Wed": { type: "rest", activity: "Rest or 3km walk", distance: 0, completed: false, notes: "" },
        "Thu": { type: "easy", activity: "4km easy run with 3x 20sec strides", distance: 4, completed: false, notes: "" },
        "Fri": { type: "rest", activity: "Rest", distance: 0, completed: false, notes: "" },
        "Sat": { type: "rest", activity: "Rest or 2km gentle walk", distance: 0, completed: false, notes: "" },
        "Sun": { type: "race", activity: "RACE DAY! 42.2km 🏃‍♀️", distance: 42.2, completed: false, notes: "" }
      }
    }
  };

  // Load data from localStorage or use default
  const loadFromStorage = () => {
    try {
      const saved = localStorage.getItem('marathonTrainingPlan');
      return saved ? JSON.parse(saved) : trainingPlan;
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      return trainingPlan;
    }
  };

  const [plan, setPlan] = useState(loadFromStorage);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [showNotes, setShowNotes] = useState({});
  const [lastSaved, setLastSaved] = useState(new Date());

  // Save to localStorage whenever plan changes
  useEffect(() => {
    try {
      localStorage.setItem('marathonTrainingPlan', JSON.stringify(plan));
      setLastSaved(new Date());
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [plan]);

  const toggleComplete = (week, day) => {
    setPlan(prev => ({
      ...prev,
      [week]: {
        ...prev[week],
        days: {
          ...prev[week].days,
          [day]: {
            ...prev[week].days[day],
            completed: !prev[week].days[day].completed
          }
        }
      }
    }));
  };

  const updateNotes = (week, day, notes) => {
    setPlan(prev => ({
      ...prev,
      [week]: {
        ...prev[week],
        days: {
          ...prev[week].days,
          [day]: {
            ...prev[week].days[day],
            notes: notes
          }
        }
      }
    }));
  };

  const toggleNotes = (week, day) => {
    const key = `${week}-${day}`;
    setShowNotes(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'rest': return 'bg-gray-100 text-gray-600';
      case 'easy': return 'bg-green-100 text-green-700';
      case 'steady': return 'bg-blue-100 text-blue-700';
      case 'tempo': return 'bg-orange-100 text-orange-700';
      case 'moderate': return 'bg-yellow-100 text-yellow-700';
      case 'long': return 'bg-purple-100 text-purple-700';
      case 'cross': return 'bg-cyan-100 text-cyan-700';
      case 'race': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getWeekStats = (weekData) => {
    const days = Object.values(weekData.days);
    const completed = days.filter(day => day.completed).length;
    const total = days.length;
    
    // Calculate distance stats
    const completedDistance = days
      .filter(day => day.completed)
      .reduce((sum, day) => sum + (day.distance || 0), 0);
    const totalPlannedDistance = days
      .reduce((sum, day) => sum + (day.distance || 0), 0);
    
    return { 
      completed, 
      total, 
      percentage: Math.round((completed / total) * 100),
      completedDistance: Math.round(completedDistance * 10) / 10,
      totalPlannedDistance: Math.round(totalPlannedDistance * 10) / 10,
      distancePercentage: totalPlannedDistance > 0 ? Math.round((completedDistance / totalPlannedDistance) * 100) : 0
    };
  };

  const getOverallStats = () => {
    let totalActivities = 0;
    let completedActivities = 0;
    let totalDistance = 0;
    let completedDistance = 0;
    
    Object.values(plan).forEach(week => {
      Object.values(week.days).forEach(day => {
        totalActivities++;
        totalDistance += (day.distance || 0);
        if (day.completed) {
          completedActivities++;
          completedDistance += (day.distance || 0);
        }
      });
    });
    
    return {
      completed: completedActivities,
      total: totalActivities,
      percentage: Math.round((completedActivities / totalActivities) * 100),
      completedDistance: Math.round(completedDistance * 10) / 10,
      totalDistance: Math.round(totalDistance * 10) / 10,
      distancePercentage: totalDistance > 0 ? Math.round((completedDistance / totalDistance) * 100) : 0
    };
  };

  const saveToFile = () => {
    const dataStr = JSON.stringify(plan, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'marathon-training-progress.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const overallStats = getOverallStats();
  const currentWeekData = plan[currentWeek];
  const weekStats = getWeekStats(currentWeekData);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              <Target className="text-blue-600" />
              Marathon Training Tracker
            </h1>
            <p className="text-gray-600 mt-2">Trail Marathon • November 23, 2025</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">{overallStats.percentage}%</div>
            <div className="text-sm text-gray-600">Activities Completed</div>
            <div className="text-xs text-gray-500">{overallStats.completed}/{overallStats.total} sessions</div>
            <div className="text-lg font-bold text-green-600 mt-1">{overallStats.distancePercentage}%</div>
            <div className="text-sm text-gray-600">Distance Completed</div>
            <div className="text-xs text-gray-500">{overallStats.completedDistance}km/{overallStats.totalDistance}km</div>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <button 
            onClick={saveToFile}
            className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
          >
            <Save className="w-4 h-4" />
            Export Progress
          </button>
          <div className="text-xs text-gray-500 flex items-center">
            Last saved: {lastSaved.toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* Week Navigation */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Week {currentWeek}: {currentWeekData.week}</h2>
          <div className="flex gap-2">
            <button 
              onClick={() => setCurrentWeek(Math.max(1, currentWeek - 1))}
              disabled={currentWeek === 1}
              className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
            >
              ← Previous
            </button>
            <button 
              onClick={() => setCurrentWeek(Math.min(15, currentWeek + 1))}
              disabled={currentWeek === 15}
              className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
            >
              Next →
            </button>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map(week => {
            const stats = getWeekStats(plan[week]);
            return (
              <button
                key={week}
                onClick={() => setCurrentWeek(week)}
                className={`px-3 py-2 rounded text-sm font-medium ${
                  currentWeek === week 
                    ? 'bg-blue-600 text-white' 
                    : stats.percentage === 100 
                      ? 'bg-green-100 text-green-700 border border-green-300'
                      : stats.percentage > 0
                        ? 'bg-yellow-100 text-yellow-700 border border-yellow-300'
                        : 'bg-gray-100 text-gray-600 border border-gray-300'
                }`}
              >
                W{week}
                {stats.percentage > 0 && <div className="text-xs">({stats.percentage}%)</div>}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-3 rounded">
            <div className="text-sm text-blue-600 font-medium">Phase</div>
            <div className="text-blue-800">{currentWeekData.phase}</div>
          </div>
          <div className="bg-green-50 p-3 rounded">
            <div className="text-sm text-green-600 font-medium">Weekly Volume</div>
            <div className="text-green-800">{currentWeekData.weeklyVolume}</div>
          </div>
          <div className="bg-purple-50 p-3 rounded">
            <div className="text-sm text-purple-600 font-medium">Week Progress</div>
            <div className="text-purple-800">{weekStats.completed}/{weekStats.total} ({weekStats.percentage}%)</div>
          </div>
          <div className="bg-orange-50 p-3 rounded">
            <div className="text-sm text-orange-600 font-medium">Distance Progress</div>
            <div className="text-orange-800">{weekStats.completedDistance}km/{weekStats.totalPlannedDistance}km ({weekStats.distancePercentage}%)</div>
          </div>
        </div>
      </div>

      {/* Weekly Calendar */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Calendar className="text-blue-600" />
          Week {currentWeek} Schedule
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-4">
          {Object.entries(currentWeekData.days).map(([day, data]) => {
            const isCompleted = data.completed;
            const notesKey = `${currentWeek}-${day}`;
            const showNotesForThisDay = showNotes[notesKey];
            
            return (
              <div key={day} className={`border rounded-lg p-4 ${isCompleted ? 'border-green-300 bg-green-50' : 'border-gray-300'}`}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-800">{day}</h4>
                  <button
                    onClick={() => toggleComplete(currentWeek, day)}
                    className="flex-shrink-0"
                  >
                    {isCompleted ? 
                      <CheckCircle2 className="text-green-600 w-6 h-6" /> : 
                      <Circle className="text-gray-400 w-6 h-6" />
                    }
                  </button>
                </div>
                
                <div className={`inline-block px-2 py-1 rounded text-xs font-medium mb-2 ${getTypeColor(data.type)}`}>
                  {data.type.charAt(0).toUpperCase() + data.type.slice(1)}
                  {data.distance > 0 && <span className="ml-1 font-bold">{data.distance}km</span>}
                </div>
                
                <p className="text-sm text-gray-700 mb-2">{data.activity}</p>
                
                {data.distance > 0 && (
                  <div className="text-xs text-gray-600 mb-2 bg-gray-100 px-2 py-1 rounded">
                    Target: {data.distance}km
                  </div>
                )}
                
                <button
                  onClick={() => toggleNotes(currentWeek, day)}
                  className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <Clock className="w-3 h-3" />
                  {data.notes ? 'Edit Notes' : 'Add Notes'}
                </button>
                
                {showNotesForThisDay && (
                  <div className="mt-2">
                    <textarea
                      value={data.notes}
                      onChange={(e) => updateNotes(currentWeek, day, e.target.value)}
                      placeholder="Add your notes, times, how you felt..."
                      className="w-full text-xs p-2 border rounded resize-none"
                      rows="3"
                    />
                  </div>
                )}
                
                {data.notes && !showNotesForThisDay && (
                  <div className="mt-2 text-xs text-gray-600 bg-gray-100 p-2 rounded">
                    {data.notes.length > 50 ? data.notes.substring(0, 50) + '...' : data.notes}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="text-green-600 w-5 h-5" />
            <span className="font-medium">Progress This Week</span>
          </div>
          <div className="text-2xl font-bold text-green-600">{weekStats.percentage}%</div>
          <div className="text-sm text-gray-600">{weekStats.completed} of {weekStats.total} activities completed</div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="text-orange-600 w-5 h-5" />
            <span className="font-medium">Week Distance</span>
          </div>
          <div className="text-2xl font-bold text-orange-600">{weekStats.distancePercentage}%</div>
          <div className="text-sm text-gray-600">{weekStats.completedDistance}km of {weekStats.totalPlannedDistance}km</div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center gap-2 mb-2">
            <Award className="text-blue-600 w-5 h-5" />
            <span className="font-medium">Days to Race</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {Math.max(0, Math.ceil((new Date('2025-11-23') - new Date()) / (1000 * 60 * 60 * 24)))}
          </div>
          <div className="text-sm text-gray-600">Keep going strong!</div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="text-purple-600 w-5 h-5" />
            <span className="font-medium">Current Phase</span>
          </div>
          <div className="text-lg font-bold text-purple-600">{currentWeekData.phase}</div>
          <div className="text-sm text-gray-600">Volume: {currentWeekData.weeklyVolume}</div>
        </div>
      </div>

      {/* Important Note */}
      <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
        <h4 className="font-semibold text-green-800 mb-2">💾 Data Storage</h4>
        <p className="text-green-700 text-sm mb-2">
          Your progress is automatically saved to your browser's local storage and will persist between sessions on this device. 
          However, it won't sync across different devices or browsers.
        </p>
        <p className="text-green-700 text-sm">
          <strong>Backup tip:</strong> Use the "Export Progress" button regularly to download a backup file of your training data.
          For permanent cross-device syncing, consider deploying this app with a database backend.
        </p>
      </div>
    </div>
  );
};

export default MarathonTrainingApp;