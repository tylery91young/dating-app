import React, { useState } from 'react';
import { Video, Users, Calendar, MapPin, X, Check, AlertCircle, UserPlus, Clock, Heart } from 'lucide-react';

const App = () => {
  const [screen, setScreen] = useState('home'); // home, portfolio, link-friend, browse, date-request, scheduled-dates, post-date
  const [currentUser, setCurrentUser] = useState({
    name: 'Alex',
    age: 23,
    photos: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop'
    ],
    interests: ['Pickleball', 'Coffee', 'Hiking', 'Live Music'],
    linkedFriend: null,
    verified: false
  });

  const [linkedFriend, setLinkedFriend] = useState(null);
  const [weeklySwipes, setWeeklySwipes] = useState(5);
  const [matches, setMatches] = useState([]);
  const [scheduledDates, setScheduledDates] = useState([]);

  // Sample double units for browsing - with trust scores and mutual connections
  const [doubleUnits] = useState([
    {
      id: 1,
      person1: {
        name: 'Sophie',
        age: 21,
        city: 'Provo',
        photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
        interests: ['Yoga', 'Brunch', 'Museums']
      },
      person2: {
        name: 'Emma',
        age: 22,
        city: 'Provo',
        photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop',
        interests: ['Tennis', 'Cooking', 'Trivia']
      },
      verified: true,
      availability: 'Weekend afternoons',
      trustScore: 95,
      datesAttended: 8,
      mutualConnections: ['Sarah Chen', 'Mike Rodriguez'],
      mutualCount: 2
    },
    {
      id: 2,
      person1: {
        name: 'Jake',
        age: 20,
        city: 'Orem',
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
        interests: ['Rock Climbing', 'Coffee', 'Books']
      },
      person2: {
        name: 'Ryan',
        age: 21,
        city: 'Provo',
        photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
        interests: ['Running', 'Art', 'Pickleball']
      },
      verified: true,
      availability: 'Weekday evenings',
      trustScore: 88,
      datesAttended: 5,
      mutualConnections: ['Jordan Kim'],
      mutualCount: 1
    },
    {
      id: 3,
      person1: {
        name: 'Mia',
        age: 20,
        city: 'Provo',
        photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop',
        interests: ['Photography', 'Hiking', 'Coffee']
      },
      person2: {
        name: 'Olivia',
        age: 21,
        city: 'Vineyard',
        photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
        interests: ['Music', 'Cycling', 'Art']
      },
      verified: true,
      availability: 'Weekend mornings',
      trustScore: 92,
      datesAttended: 6,
      mutualConnections: ['Sarah Chen', 'Alex Park', 'Jamie Lee'],
      mutualCount: 3
    },
    {
      id: 4,
      person1: {
        name: 'Ava',
        age: 19,
        city: 'Provo',
        photo: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=400&fit=crop',
        interests: ['Basketball', 'Movies', 'Food']
      },
      person2: {
        name: 'Isabella',
        age: 20,
        city: 'Orem',
        photo: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop',
        interests: ['Volleyball', 'Gaming', 'Cooking']
      },
      verified: true,
      availability: 'Weekend evenings',
      trustScore: 90,
      datesAttended: 7,
      mutualConnections: ['Mike Rodriguez'],
      mutualCount: 1
    },
    {
      id: 5,
      person1: {
        name: 'Lily',
        age: 21,
        city: 'Provo',
        photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
        interests: ['Swimming', 'Reading', 'Travel']
      },
      person2: {
        name: 'Grace',
        age: 20,
        city: 'Provo',
        photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop',
        interests: ['Dancing', 'Coffee', 'Hiking']
      },
      verified: true,
      availability: 'Weekday mornings',
      trustScore: 85,
      datesAttended: 4,
      mutualConnections: ['Sarah Chen', 'Jordan Kim'],
      mutualCount: 2
    }
  ].sort((a, b) => b.trustScore - a.trustScore));

  const [currentDoubleIndex, setCurrentDoubleIndex] = useState(0);
  const [friendVote, setFriendVote] = useState(null);
  const [showDateRequest, setShowDateRequest] = useState(false);
  const [pendingMatch, setPendingMatch] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const activities = [
    { name: 'Pickleball', icon: '🏓', venue: 'Hillcrest Park', location: 'Provo, UT' },
    { name: 'Spikeball', icon: '🏐', venue: 'Hillcrest Park', location: 'Provo, UT' },
    { name: 'Axe Throwing', icon: '🪓', venue: 'Heber Hatchets', location: 'Heber, UT' },
    { name: 'Escape Room', icon: '🔐', venue: 'Escapes in Time', location: 'Provo, UT' },
    { name: 'Golf', icon: '⛳', venue: 'Topgolf', location: 'Vineyard, UT' }
  ];

  const linkFriend = () => {
    setLinkedFriend({
      name: 'Jordan',
      age: 24,
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
    });
    setScreen('browse');
  };

  const handleVote = (vote) => {
    if (friendVote === null) {
      setFriendVote(vote);
      setTimeout(() => {
        const currentDouble = doubleUnits[currentDoubleIndex];
        if (vote === 'yes' && Math.random() > 0.3) {
          setMatches([...matches, currentDouble]);
          setPendingMatch(currentDouble);
          setShowDateRequest(true);
          setFriendVote(null);
          // Don't increment index here - wait until they schedule or cancel
        } else {
          // Only increment on pass
          setWeeklySwipes(weeklySwipes - 1);
          setFriendVote(null);
          setCurrentDoubleIndex(currentDoubleIndex + 1);
        }
      }, 1000);
    }
  };

  const scheduleDate = () => {
    if (!selectedActivity || !selectedDay || !selectedTime) return;
    
    setScheduledDates([...scheduledDates, {
      id: Date.now(),
      match: pendingMatch,
      activity: selectedActivity,
      date: `${selectedDay}, ${selectedTime}`,
      status: 'confirmed'
    }]);
    
    // Clean up and move to next double
    setShowDateRequest(false);
    setPendingMatch(null);
    setSelectedActivity(null);
    setSelectedDay('');
    setSelectedTime('');
    setWeeklySwipes(weeklySwipes - 1);
    setCurrentDoubleIndex(currentDoubleIndex + 1); // Now increment after scheduling
    setScreen('scheduled-dates');
  };

  if (screen === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <div className="text-center mb-12">
            <h1 className="text-6xl font-bold text-slate-800 mb-3">DoubleDate</h1>
            <p className="text-slate-600 text-lg">Real dates. Real people. No endless texting.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Users className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-1">Date with a friend</h3>
                  <p className="text-slate-600 text-sm">Double dates only. Built-in safety and social proof.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Calendar className="text-green-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-1">Skip the small talk</h3>
                  <p className="text-slate-600 text-sm">Request real dates at public venues. No endless chatting.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Heart className="text-purple-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-1">Quality over quantity</h3>
                  <p className="text-slate-600 text-sm">Limited matches per week. Every connection matters.</p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setScreen('portfolio')}
            className="w-full bg-slate-800 text-white py-4 rounded-xl font-semibold text-lg hover:bg-slate-700 transition shadow-lg"
          >
            Create Your Portfolio
          </button>
        </div>
      </div>
    );
  }

  if (screen === 'portfolio') {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-2xl mx-auto">
          <button onClick={() => setScreen('home')} className="text-slate-600 mb-6">← Back</button>
          
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Create Your Portfolio</h2>
          <p className="text-slate-600 mb-8">Show who you are. No filters, just you.</p>

          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-700 mb-3">Photos (3-5 required)</label>
              <div className="grid grid-cols-3 gap-4">
                {currentUser.photos.map((photo, i) => (
                  <div key={i} className="aspect-square rounded-xl overflow-hidden bg-slate-100">
                    <img src={photo} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
                <button className="aspect-square rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 hover:border-slate-400 hover:text-slate-500 transition">
                  + Add
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                <Video className="inline mr-2" size={16} />
                Intro Video (10-30 seconds)
              </label>
              <div className="aspect-video rounded-xl bg-slate-100 flex items-center justify-center border-2 border-dashed border-slate-300">
                <button className="text-slate-500 font-medium">Record Video</button>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-700 mb-3">Your Interests</label>
              <div className="flex flex-wrap gap-2">
                {currentUser.interests.map((interest, i) => (
                  <span key={i} className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                    {interest} <X className="inline ml-1" size={14} />
                  </span>
                ))}
                <button className="border-2 border-slate-300 text-slate-600 px-4 py-2 rounded-full text-sm font-medium hover:border-slate-400">
                  + Add Interest
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-700 mb-3">Availability</label>
              <select className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500">
                <option>Weekday evenings</option>
                <option>Weekend afternoons</option>
                <option>Weekend evenings</option>
                <option>Flexible</option>
              </select>
            </div>
          </div>

          <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-amber-600 mt-1" size={20} />
              <div>
                <h4 className="font-semibold text-amber-900 mb-1">Verification Required</h4>
                <p className="text-amber-800 text-sm">You'll need to verify your identity before you can start dating.</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setScreen('link-friend')}
            className="w-full bg-slate-800 text-white py-4 rounded-xl font-semibold hover:bg-slate-700 transition"
          >
            Continue to Friend Linking
          </button>
        </div>
      </div>
    );
  }

  if (screen === 'link-friend') {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-md mx-auto pt-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Link with a Friend</h2>
          <p className="text-slate-600 mb-8">You need a friend to form a Double Unit and start dating.</p>

          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="text-center py-8">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserPlus className="text-blue-600" size={32} />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">Search for your friend</h3>
              <p className="text-slate-600 text-sm mb-6">Both of you must approve the link</p>
              
              <input
                type="text"
                placeholder="Enter friend's name or username"
                className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 mb-4 focus:outline-none focus:border-blue-500"
              />

              <button
                onClick={linkFriend}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                Send Link Request
              </button>
            </div>
          </div>

          <div className="bg-slate-100 rounded-xl p-4">
            <h4 className="font-semibold text-slate-700 mb-2 text-sm">How it works:</h4>
            <ul className="text-slate-600 text-sm space-y-2">
              <li className="flex items-start gap-2">
                <Check className="text-green-600 mt-0.5 flex-shrink-0" size={16} />
                <span>Both you and your friend must approve</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-green-600 mt-0.5 flex-shrink-0" size={16} />
                <span>Either of you can pause or end the unit anytime</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="text-green-600 mt-0.5 flex-shrink-0" size={16} />
                <span>Both must be active to swipe and match</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'browse') {
    if (showDateRequest && pendingMatch) {
      return (
        <div className="min-h-screen bg-slate-50 p-6">
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-6">
              <div className="text-5xl mb-3">🎉</div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">It's a Match!</h2>
              <p className="text-slate-600">Ask them out by picking an activity and time</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex items-center justify-center gap-4 mb-6">
                <img src={pendingMatch.person1.photo} alt="" className="w-16 h-16 rounded-full object-cover" />
                <span className="text-slate-400 text-2xl">+</span>
                <img src={pendingMatch.person2.photo} alt="" className="w-16 h-16 rounded-full object-cover" />
              </div>
              <div className="text-center mb-6">
                <h3 className="font-bold text-slate-800 text-lg">{pendingMatch.person1.name} & {pendingMatch.person2.name}</h3>
              </div>

              {!selectedActivity ? (
                <>
                  <h4 className="font-semibold text-slate-700 mb-3 text-center">Pick an Activity</h4>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    {activities.map((activity, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedActivity(activity)}
                        className="border-2 border-slate-200 rounded-xl p-4 hover:border-blue-500 hover:bg-blue-50 transition text-left"
                      >
                        <div className="text-2xl mb-1">{activity.icon}</div>
                        <div className="font-semibold text-slate-800 text-sm">{activity.name}</div>
                        <div className="text-slate-500 text-xs">{activity.venue}</div>
                        <div className="text-slate-400 text-xs">{activity.location}</div>
                      </button>
                    ))}
                  </div>
                  <button className="w-full border-2 border-dashed border-slate-300 rounded-xl p-4 text-slate-500 hover:border-slate-400 hover:text-slate-600 transition font-medium text-sm">
                    + Suggest Custom Activity
                  </button>
                </>
              ) : (
                <>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-2xl mb-1">{selectedActivity.icon}</div>
                        <div className="font-semibold text-slate-800">{selectedActivity.name}</div>
                        <div className="text-slate-600 text-sm">{selectedActivity.venue}</div>
                        <div className="text-slate-500 text-xs">{selectedActivity.location}</div>
                      </div>
                      <button 
                        onClick={() => setSelectedActivity(null)}
                        className="text-slate-400 hover:text-slate-600"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </div>

                  <h4 className="font-semibold text-slate-700 mb-3">When do you want to go?</h4>
                  
                  <div className="mb-4">
                    <label className="block text-sm text-slate-600 mb-2">Day</label>
                    <select 
                      value={selectedDay}
                      onChange={(e) => setSelectedDay(e.target.value)}
                      className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                    >
                      <option value="">Choose a day...</option>
                      <option value="Today">Today</option>
                      <option value="Tomorrow">Tomorrow</option>
                      <option value="This Saturday">This Saturday</option>
                      <option value="This Sunday">This Sunday</option>
                      <option value="Next Week">Next Week</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm text-slate-600 mb-2">Time</label>
                    <select 
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500"
                    >
                      <option value="">Choose a time...</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="2:00 PM">2:00 PM</option>
                      <option value="4:00 PM">4:00 PM</option>
                      <option value="6:00 PM">6:00 PM</option>
                      <option value="7:00 PM">7:00 PM</option>
                      <option value="8:00 PM">8:00 PM</option>
                    </select>
                  </div>

                  <button
                    onClick={scheduleDate}
                    disabled={!selectedDay || !selectedTime}
                    className={`w-full py-4 rounded-xl font-semibold transition ${
                      selectedDay && selectedTime
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    Send Date Request
                  </button>

                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-4">
                    <h4 className="font-semibold text-amber-900 text-sm mb-1">💰 Who Pays?</h4>
                    <p className="text-amber-800 text-xs">
                      Recommend splitting equally or each double pays. Discuss what works!
                    </p>
                  </div>
                </>
              )}

              <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-600 mt-4">
                <MapPin className="inline mr-1" size={14} />
                All four people meet at the venue. No pickups for first dates.
              </div>
            </div>
          </div>
        </div>
      );
    }

    const currentDouble = doubleUnits[currentDoubleIndex];
    
    if (!currentDouble || weeklySwipes === 0) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
          <div className="text-center">
            <div className="text-6xl mb-4">✨</div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">You're all caught up!</h2>
            <p className="text-slate-600 mb-6">New matches arrive weekly. Check back soon.</p>
            <button
              onClick={() => setScreen('scheduled-dates')}
              className="bg-slate-800 text-white px-6 py-3 rounded-xl font-semibold hover:bg-slate-700"
            >
              View Scheduled Dates
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">Browse Doubles</h2>
              <p className="text-slate-600 text-sm">{weeklySwipes} swipes left this week</p>
            </div>
            <button
              onClick={() => setScreen('scheduled-dates')}
              className="text-slate-600 hover:text-slate-800"
            >
              <Calendar size={24} />
            </button>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-slate-800 text-sm mb-2">🎯 Prioritized by Attendance</h3>
            <p className="text-slate-600 text-xs">
              Doubles who consistently show up to dates appear first. We quietly deprioritize no-shows.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
            <div className="grid grid-cols-2 gap-0">
              <div className="relative">
                <img src={currentDouble.person1.photo} alt={currentDouble.person1.name} className="w-full h-80 object-cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white font-bold text-lg">{currentDouble.person1.name}, {currentDouble.person1.age}</h3>
                  <p className="text-white/90 text-sm">{currentDouble.person1.city}</p>
                </div>
              </div>
              <div className="relative">
                <img src={currentDouble.person2.photo} alt={currentDouble.person2.name} className="w-full h-80 object-cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-white font-bold text-lg">{currentDouble.person2.name}, {currentDouble.person2.age}</h3>
                  <p className="text-white/90 text-sm">{currentDouble.person2.city}</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Check className="text-green-600" size={18} />
                <span className="text-sm text-slate-600 font-medium">Verified Double Unit</span>
              </div>

              {currentDouble.mutualCount > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                  <div className="flex items-start gap-2">
                    <Users className="text-blue-600 mt-0.5" size={16} />
                    <div>
                      <p className="text-blue-900 font-medium text-sm">
                        {currentDouble.mutualCount} mutual {currentDouble.mutualCount === 1 ? 'connection' : 'connections'}
                      </p>
                      <p className="text-blue-700 text-xs mt-1">
                        You both know {currentDouble.mutualConnections.slice(0, 2).join(' and ')}
                        {currentDouble.mutualCount > 2 && ` + ${currentDouble.mutualCount - 2} more`}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mb-4">
                <h4 className="font-semibold text-slate-700 text-sm mb-2">Shared Interests</h4>
                <div className="flex flex-wrap gap-2">
                  {[...new Set([...currentDouble.person1.interests, ...currentDouble.person2.interests])].slice(0, 4).map((interest, i) => (
                    <span key={i} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-600 mb-6">
                <Clock size={16} />
                <span>{currentDouble.availability}</span>
              </div>

              <div className="text-center mb-4">
                {friendVote && (
                  <p className="text-sm text-slate-600 mb-2">
                    {linkedFriend?.name} voted {friendVote === 'yes' ? '✓' : '✗'}
                  </p>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => handleVote('no')}
                  className="flex-1 border-2 border-slate-300 text-slate-700 py-4 rounded-xl font-semibold hover:border-slate-400 transition"
                  disabled={friendVote !== null}
                >
                  Pass
                </button>
                <button
                  onClick={() => handleVote('yes')}
                  className="flex-1 bg-slate-800 text-white py-4 rounded-xl font-semibold hover:bg-slate-700 transition"
                  disabled={friendVote !== null}
                >
                  Interested
                </button>
              </div>
            </div>
          </div>

          {matches.length > 0 && (
            <button
              onClick={() => setScreen('scheduled-dates')}
              className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 mb-4"
            >
              View Scheduled Dates ({scheduledDates.length})
            </button>
          )}

          <div className="text-center text-slate-500 text-sm">
            Both you and {linkedFriend?.name} must vote yes to match
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'date-request') {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-lg mx-auto">
          <button onClick={() => setScreen('browse')} className="text-slate-600 mb-6">← Back to Browse</button>
          
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Request a Date</h2>

          {matches.map(match => (
            <div key={match.id} className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex items-center gap-4 mb-6">
                <img src={match.person1.photo} alt="" className="w-16 h-16 rounded-full object-cover" />
                <span className="text-slate-400">+</span>
                <img src={match.person2.photo} alt="" className="w-16 h-16 rounded-full object-cover" />
                <div>
                  <h3 className="font-bold text-slate-800">{match.person1.name} & {match.person2.name}</h3>
                  <p className="text-slate-600 text-sm">Matched just now</p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-slate-700 mb-3">Choose an Activity</h4>
                <div className="grid grid-cols-2 gap-3">
                  {activities.map((activity, i) => (
                    <button
                      key={i}
                      onClick={() => scheduleDate(match, activity)}
                      className="border-2 border-slate-200 rounded-xl p-4 hover:border-blue-500 hover:bg-blue-50 transition text-left"
                    >
                      <div className="text-2xl mb-1">{activity.icon}</div>
                      <div className="font-semibold text-slate-800 text-sm">{activity.name}</div>
                      <div className="text-slate-500 text-xs">{activity.venue}</div>
                      <div className="text-slate-400 text-xs">{activity.location}</div>
                    </button>
                  ))}
                </div>
                <button className="w-full mt-3 border-2 border-dashed border-slate-300 rounded-xl p-4 text-slate-500 hover:border-slate-400 hover:text-slate-600 transition font-medium text-sm">
                  + Suggest Custom Activity
                </button>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4">
                <h4 className="font-semibold text-amber-900 text-sm mb-2">💰 Who Pays?</h4>
                <p className="text-amber-800 text-xs mb-3">
                  We recommend splitting costs equally among all four people, or each double covers themselves. Figure out what works for your group!
                </p>
                <div className="flex gap-2">
                  <button className="flex-1 bg-white border border-amber-300 text-amber-900 px-3 py-2 rounded-lg text-xs font-medium hover:bg-amber-100">
                    Split 4 Ways
                  </button>
                  <button className="flex-1 bg-white border border-amber-300 text-amber-900 px-3 py-2 rounded-lg text-xs font-medium hover:bg-amber-100">
                    Each Double Pays
                  </button>
                  <button className="flex-1 bg-white border border-amber-300 text-amber-900 px-3 py-2 rounded-lg text-xs font-medium hover:bg-amber-100">
                    Discuss Later
                  </button>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-600">
                <MapPin className="inline mr-1" size={14} />
                All four people meet at the venue. No pickups for first dates.
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (screen === 'scheduled-dates') {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-lg mx-auto">
          <button onClick={() => setScreen('browse')} className="text-slate-600 mb-6">← Back</button>
          
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Upcoming Dates</h2>

          {scheduledDates.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="text-5xl mb-4">📅</div>
              <p className="text-slate-600">No dates scheduled yet</p>
            </div>
          ) : (
            scheduledDates.map(date => (
              <div key={date.id} className="bg-white rounded-2xl shadow-lg p-6 mb-4">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg mb-1">{date.activity.name}</h3>
                    <p className="text-slate-600 text-sm">{date.date}</p>
                    <p className="text-slate-500 text-sm">{date.activity.venue}</p>
                  </div>
                  <span className="text-3xl">{date.activity.icon}</span>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <img src={date.match.person1.photo} alt="" className="w-12 h-12 rounded-full" />
                  <img src={date.match.person2.photo} alt="" className="w-12 h-12 rounded-full" />
                  <span className="text-slate-600 text-sm font-medium">
                    {date.match.person1.name} & {date.match.person2.name}
                  </span>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 bg-slate-100 text-slate-700 py-2 rounded-lg text-sm font-medium hover:bg-slate-200">
                    View Details
                  </button>
                  <button className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700">
                    On My Way
                  </button>
                </div>
              </div>
            ))
          )}

          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mt-6">
            <h4 className="font-semibold text-blue-900 mb-2 text-sm">Safety Features Active</h4>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• Emergency exit available anytime</li>
              <li>• Optional location sharing</li>
              <li>• Public venue only</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default App;
