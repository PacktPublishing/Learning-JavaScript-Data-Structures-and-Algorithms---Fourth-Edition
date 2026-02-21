/**
 * MediaPlayer Implementation using Linked Lists
 * 
 * This is a practical example that demonstrates how different types of linked lists
 * can be used to implement various features of a media player application.
 * 
 * Features implemented:
 * - Main playlist using CircularLinkedList for continuous play
 * - Recently played tracks using DoublyLinkedList for bidirectional navigation
 * - Queue system using LinkedList for sequential playback
 */

import { LinkedList } from './linked-list.js';
import { DoublyLinkedList } from './doubly-linked-list.js';
import { CircularLinkedList } from './circular-linked-list.js';

/**
 * Represents a media track with basic properties
 */
class Track {
  constructor(title, artist, duration, filePath) {
    this.title = title;
    this.artist = artist;
    this.duration = duration; // in seconds
    this.filePath = filePath;
    this.playCount = 0;
    this.lastPlayed = null;
  }

  /**
   * Formats the duration from seconds to MM:SS format
   * @returns {string} Formatted duration
   */
  get formattedDuration() {
    const minutes = Math.floor(this.duration / 60);
    const seconds = this.duration % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  /**
   * Plays the track (simulation)
   * Updates play count and last played timestamp
   */
  play() {
    this.playCount++;
    this.lastPlayed = new Date();
    console.log(`🎵 Now playing: "${this.title}" by ${this.artist} (${this.formattedDuration})`);
  }

  /**
   * String representation of the track
   */
  toString() {
    return `"${this.title}" by ${this.artist}`;
  }
}

/**
 * MediaPlayer class demonstrating practical linked list usage
 * 
 * This implementation shows how different types of linked lists can be used
 * for different functionalities in a real application.
 */
class MediaPlayer {
  constructor() {
    // Main playlist - CircularLinkedList for continuous play and shuffle
    this.#playlist = new CircularLinkedList();
    
    // Queue for upcoming tracks - LinkedList for FIFO behavior
    this.#queue = new LinkedList();
    
    // Recently played tracks - DoublyLinkedList for bidirectional navigation
    this.#recentlyPlayed = new DoublyLinkedList();
    
    // Player state
    this.#currentTrack = null;
    this.#isPlaying = false;
    this.#shuffleMode = false;
    this.#repeatMode = 'none'; // 'none', 'one', 'all'
    this.#maxRecentlyPlayed = 10;
  }

  // Private fields
  #playlist = null;
  #queue = null;
  #recentlyPlayed = null;
  #currentTrack = null;
  #isPlaying = false;
  #shuffleMode = false;
  #repeatMode = 'none';
  #maxRecentlyPlayed = 10;

  /**
   * Adds a track to the main playlist
   * @param {Track} track - The track to add
   */
  addToPlaylist(track) {
    if (!(track instanceof Track)) {
      throw new Error('Invalid track object');
    }
    this.#playlist.append(track);
    console.log(`➕ Added to playlist: ${track}`);
  }

  /**
   * Adds a track to the queue (will play before continuing with playlist)
   * @param {Track} track - The track to add to queue
   */
  addToQueue(track) {
    if (!(track instanceof Track)) {
      throw new Error('Invalid track object');
    }
    this.#queue.append(track);
    console.log(`📋 Added to queue: ${track}`);
  }

  /**
   * Plays the next track according to the current mode and queue
   */
  playNext() {
    let nextTrack = null;

    // Priority 1: Check if there are queued tracks
    if (!this.#queue.isEmpty()) {
      nextTrack = this.#queue.removeAt(0);
      console.log('📋 Playing from queue');
    }
    // Priority 2: Check repeat mode for current track
    else if (this.#repeatMode === 'one' && this.#currentTrack) {
      nextTrack = this.#currentTrack;
      console.log('🔂 Repeating current track');
    }
    // Priority 3: Get next track from playlist
    else if (!this.#playlist.isEmpty()) {
      // In shuffle mode, rotate to a random position
      if (this.#shuffleMode) {
        const randomRotation = Math.floor(Math.random() * this.#playlist.size);
        this.#playlist.rotate(randomRotation);
        console.log('🔀 Shuffle mode - random track selected');
      } else {
        this.#playlist.rotate(1); // Move to next track
      }
      nextTrack = this.#playlist.getCurrent();
    }

    if (nextTrack) {
      this.#playTrack(nextTrack);
    } else {
      console.log('⏹️ No more tracks to play');
      this.#isPlaying = false;
    }
  }

  /**
   * Plays the previous track from recently played
   */
  playPrevious() {
    if (this.#recentlyPlayed.size >= 2) {
      // Remove current track from recently played if it's there
      if (this.#recentlyPlayed.size > 0) {
        this.#recentlyPlayed.removeLast();
      }
      // Get the previous track
      const previousTrack = this.#recentlyPlayed.removeLast();
      console.log('⏮️ Playing previous track');
      this.#playTrack(previousTrack);
    } else {
      console.log('❌ No previous track available');
    }
  }

  /**
   * Skips the current track and plays the next one
   */
  skip() {
    console.log('⏭️ Skipping track');
    this.playNext();
  }

  /**
   * Toggles shuffle mode
   */
  toggleShuffle() {
    this.#shuffleMode = !this.#shuffleMode;
    console.log(`🔀 Shuffle mode: ${this.#shuffleMode ? 'ON' : 'OFF'}`);
  }

  /**
   * Cycles through repeat modes: none -> one -> all -> none
   */
  toggleRepeat() {
    const modes = ['none', 'one', 'all'];
    const currentIndex = modes.indexOf(this.#repeatMode);
    this.#repeatMode = modes[(currentIndex + 1) % modes.length];
    
    const modeSymbols = { 'none': '↻', 'one': '🔂', 'all': '🔁' };
    console.log(`${modeSymbols[this.#repeatMode]} Repeat mode: ${this.#repeatMode.toUpperCase()}`);
  }

  /**
   * Shows the current queue
   */
  showQueue() {
    console.log('\n📋 Current Queue:');
    if (this.#queue.isEmpty()) {
      console.log('   Queue is empty');
    } else {
      const queueArray = this.#queue.toArray();
      queueArray.forEach((track, index) => {
        console.log(`   ${index + 1}. ${track}`);
      });
    }
    console.log(`   Total queued tracks: ${this.#queue.size}\n`);
  }

  /**
   * Shows recently played tracks
   */
  showRecentlyPlayed() {
    console.log('\n🕐 Recently Played:');
    if (this.#recentlyPlayed.isEmpty()) {
      console.log('   No recently played tracks');
    } else {
      // Show most recent first
      const recentArray = this.#recentlyPlayed.toArray().reverse();
      recentArray.forEach((track, index) => {
        const playTime = track.lastPlayed ? 
          track.lastPlayed.toLocaleTimeString() : 'Unknown';
        console.log(`   ${index + 1}. ${track} (played at ${playTime})`);
      });
    }
    console.log(`   Total recently played: ${this.#recentlyPlayed.size}\n`);
  }

  /**
   * Shows the current playlist
   */
  showPlaylist() {
    console.log('\n🎵 Current Playlist:');
    if (this.#playlist.isEmpty()) {
      console.log('   Playlist is empty');
    } else {
      const playlistArray = this.#playlist.toArray();
      playlistArray.forEach((track, index) => {
        const isCurrent = track === this.#currentTrack ? '▶️ ' : '   ';
        console.log(`${isCurrent}${index + 1}. ${track}`);
      });
    }
    console.log(`   Total tracks: ${this.#playlist.size}\n`);
  }

  /**
   * Shows the current player status
   */
  showStatus() {
    console.log('\n🎵 Media Player Status:');
    console.log(`   Current Track: ${this.#currentTrack ? this.#currentTrack : 'None'}`);
    console.log(`   Playing: ${this.#isPlaying ? 'Yes' : 'No'}`);
    console.log(`   Shuffle: ${this.#shuffleMode ? 'ON' : 'OFF'}`);
    console.log(`   Repeat: ${this.#repeatMode.toUpperCase()}`);
    console.log(`   Playlist Size: ${this.#playlist.size}`);
    console.log(`   Queue Size: ${this.#queue.size}`);
    console.log(`   Recently Played: ${this.#recentlyPlayed.size}\n`);
  }

  /**
   * Clears all player data
   */
  reset() {
    this.#playlist.clear();
    this.#queue.clear();
    this.#recentlyPlayed.clear();
    this.#currentTrack = null;
    this.#isPlaying = false;
    this.#shuffleMode = false;
    this.#repeatMode = 'none';
    console.log('🔄 Media player reset');
  }

  // Private helper methods

  /**
   * Internal method to play a track and update recently played
   * @private
   * @param {Track} track - The track to play
   */
  #playTrack(track) {
    // Add current track to recently played before switching
    if (this.#currentTrack) {
      this.#addToRecentlyPlayed(this.#currentTrack);
    }

    this.#currentTrack = track;
    this.#isPlaying = true;
    track.play();
  }

  /**
   * Adds a track to the recently played list
   * @private
   * @param {Track} track - The track to add
   */
  #addToRecentlyPlayed(track) {
    // Remove the track if it's already in recently played
    const existingIndex = this.#recentlyPlayed.indexOf(track);
    if (existingIndex !== -1) {
      this.#recentlyPlayed.removeAt(existingIndex);
    }

    // Add to the end (most recent)
    this.#recentlyPlayed.append(track);

    // Maintain max size by removing oldest
    while (this.#recentlyPlayed.size > this.#maxRecentlyPlayed) {
      this.#recentlyPlayed.removeAt(0);
    }
  }

  /**
   * Gets player statistics
   */
  getStats() {
    const playlistArray = this.#playlist.toArray();
    const totalDuration = playlistArray.reduce((sum, track) => sum + track.duration, 0);
    const totalPlays = playlistArray.reduce((sum, track) => sum + track.playCount, 0);
    const mostPlayedTrack = playlistArray.reduce((max, track) => 
      track.playCount > max.playCount ? track : max, playlistArray[0] || { playCount: 0 });

    return {
      totalTracks: this.#playlist.size,
      totalDuration: totalDuration,
      formattedTotalDuration: `${Math.floor(totalDuration / 3600)}h ${Math.floor((totalDuration % 3600) / 60)}m`,
      totalPlays: totalPlays,
      mostPlayedTrack: mostPlayedTrack.title || 'None'
    };
  }
}

// Example usage and demonstration
if (require.main === module) {
  console.log('=== MediaPlayer Implementation Demo ===\n');

  // Create sample tracks
  const tracks = [
    new Track('Bohemian Rhapsody', 'Queen', 355, '/music/queen/bohemian_rhapsody.mp3'),
    new Track('Hotel California', 'Eagles', 391, '/music/eagles/hotel_california.mp3'),
    new Track('Imagine', 'John Lennon', 183, '/music/lennon/imagine.mp3'),
    new Track('Billie Jean', 'Michael Jackson', 294, '/music/mj/billie_jean.mp3'),
    new Track('Sweet Child O Mine', 'Guns N Roses', 356, '/music/gnr/sweet_child.mp3'),
  ];

  // Create media player instance
  const player = new MediaPlayer();

  console.log('1. Building a playlist');
  tracks.forEach(track => player.addToPlaylist(track));

  console.log('\n2. Initial player status');
  player.showStatus();

  console.log('3. Playing through several tracks');
  player.playNext(); // First track
  console.log('');
  player.playNext(); // Second track
  console.log('');
  player.playNext(); // Third track
  console.log('');

  console.log('4. Adding some tracks to queue');
  player.addToQueue(tracks[4]); // Sweet Child O Mine
  player.addToQueue(tracks[0]); // Bohemian Rhapsody
  player.showQueue();

  console.log('5. Playing next (should play from queue)');
  player.playNext();
  console.log('');
  player.playNext();
  console.log('');

  console.log('6. Checking recently played');
  player.showRecentlyPlayed();

  console.log('7. Testing previous track functionality');
  player.playPrevious();
  console.log('');

  console.log('8. Testing shuffle mode');
  player.toggleShuffle();
  console.log('Playing next few tracks with shuffle:');
  player.playNext();
  console.log('');
  player.playNext();
  console.log('');
  player.playNext();
  console.log('');

  console.log('9. Testing repeat modes');
  player.toggleRepeat(); // Should be 'one'
  console.log('Playing next (should repeat current):');
  player.playNext();
  console.log('');

  player.toggleRepeat(); // Should be 'all'
  player.toggleRepeat(); // Should be 'none'

  console.log('10. Current playlist view');
  player.showPlaylist();

  console.log('11. Player statistics');
  const stats = player.getStats();
  console.log(`📊 Player Statistics:`);
  console.log(`   Total tracks: ${stats.totalTracks}`);
  console.log(`   Total duration: ${stats.formattedTotalDuration}`);
  console.log(`   Total plays: ${stats.totalPlays}`);
  console.log(`   Most played: ${stats.mostPlayedTrack}\n`);

  console.log('12. Testing skip functionality');
  player.skip();
  console.log('');

  console.log('13. Final player status');
  player.showStatus();

  console.log('14. Demonstrating circular playlist behavior');
  console.log('Continuing to play (circular playlist):');
  for (let i = 0; i < 8; i++) {
    player.playNext();
    console.log('');
  }

  console.log('15. Final recently played list');
  player.showRecentlyPlayed();
}

// Export classes for use in other modules
export { MediaPlayer, Track };