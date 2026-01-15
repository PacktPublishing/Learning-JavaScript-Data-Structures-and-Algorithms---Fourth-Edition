/**
 * MediaPlayer Implementation using Linked Lists in TypeScript
 * 
 * This is a practical example that demonstrates how different types of linked lists
 * can be used to implement various features of a media player application with
 * full type safety and generics.
 * 
 * Features implemented:
 * - Main playlist using CircularLinkedList for continuous play
 * - Recently played tracks using DoublyLinkedList for bidirectional navigation
 * - Queue system using LinkedList for sequential playback
 */

import { LinkedList } from './linked-list';
import { DoublyLinkedList } from './doubly-linked-list';
import { CircularLinkedList } from './circular-linked-list';

/**
 * Enum for track quality/bitrate
 */
export enum AudioQuality {
  LOW = '128kbps',
  MEDIUM = '256kbps',
  HIGH = '320kbps',
  LOSSLESS = 'FLAC'
}

/**
 * Enum for repeat modes
 */
export enum RepeatMode {
  NONE = 'none',
  ONE = 'one',
  ALL = 'all'
}

/**
 * Interface representing a media track
 */
export interface ITrack {
  readonly id: string;
  readonly title: string;
  readonly artist: string;
  readonly album?: string;
  readonly duration: number; // in seconds
  readonly filePath: string;
  readonly quality: AudioQuality;
  playCount: number;
  lastPlayed: Date | null;
  isFavorite: boolean;
}

/**
 * Interface for player statistics
 */
export interface IPlayerStats {
  totalTracks: number;
  totalDuration: number;
  formattedTotalDuration: string;
  totalPlays: number;
  mostPlayedTrack: string;
  averageTrackDuration: number;
  favoriteTracksCount: number;
}

/**
 * Interface for the media player
 */
export interface IMediaPlayer {
  addToPlaylist(track: ITrack): void;
  addToQueue(track: ITrack): void;
  playNext(): void;
  playPrevious(): void;
  skip(): void;
  toggleShuffle(): void;
  toggleRepeat(): void;
  showQueue(): void;
  showRecentlyPlayed(): void;
  showPlaylist(): void;
  showStatus(): void;
  reset(): void;
  getStats(): IPlayerStats;
}

/**
 * Represents a media track with comprehensive properties
 */
export class Track implements ITrack {
  public playCount: number = 0;
  public lastPlayed: Date | null = null;
  public isFavorite: boolean = false;

  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly artist: string,
    public readonly duration: number,
    public readonly filePath: string,
    public readonly quality: AudioQuality = AudioQuality.MEDIUM,
    public readonly album?: string
  ) {}

  /**
   * Formats the duration from seconds to MM:SS format
   */
  public get formattedDuration(): string {
    const minutes = Math.floor(this.duration / 60);
    const seconds = this.duration % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  /**
   * Plays the track (simulation)
   * Updates play count and last played timestamp
   */
  public play(): void {
    this.playCount++;
    this.lastPlayed = new Date();
    const favoriteIcon = this.isFavorite ? '💖' : '🎵';
    console.log(`${favoriteIcon} Now playing: "${this.title}" by ${this.artist} (${this.formattedDuration}, ${this.quality})`);
  }

  /**
   * Toggles favorite status
   */
  public toggleFavorite(): void {
    this.isFavorite = !this.isFavorite;
    const status = this.isFavorite ? 'Added to' : 'Removed from';
    console.log(`💖 ${status} favorites: "${this.title}" by ${this.artist}`);
  }

  /**
   * String representation of the track
   */
  public toString(): string {
    const favoriteIcon = this.isFavorite ? '💖' : '';
    return `"${this.title}" by ${this.artist}${favoriteIcon}`;
  }

  /**
   * Creates a copy of the track (useful for immutability)
   */
  public clone(): Track {
    const cloned = new Track(
      this.id,
      this.title,
      this.artist,
      this.duration,
      this.filePath,
      this.quality,
      this.album
    );
    cloned.playCount = this.playCount;
    cloned.lastPlayed = this.lastPlayed;
    cloned.isFavorite = this.isFavorite;
    return cloned;
  }
}

/**
 * MediaPlayer class demonstrating practical linked list usage with TypeScript
 * 
 * This implementation shows how different types of linked lists can be used
 * for different functionalities in a real application with full type safety.
 */
export class MediaPlayer implements IMediaPlayer {
  // Main playlist - CircularLinkedList for continuous play and shuffle
  private playlist: CircularLinkedList<ITrack> = new CircularLinkedList<ITrack>();
  
  // Queue for upcoming tracks - LinkedList for FIFO behavior
  private queue: LinkedList<ITrack> = new LinkedList<ITrack>();
  
  // Recently played tracks - DoublyLinkedList for bidirectional navigation
  private recentlyPlayed: DoublyLinkedList<ITrack> = new DoublyLinkedList<ITrack>();
  
  // Player state
  private currentTrack: ITrack | null = null;
  private isPlaying: boolean = false;
  private shuffleMode: boolean = false;
  private repeatMode: RepeatMode = RepeatMode.NONE;
  private readonly maxRecentlyPlayed: number = 10;

  /**
   * Adds a track to the main playlist
   * @param track - The track to add
   */
  public addToPlaylist(track: ITrack): void {
    this.playlist.append(track);
    console.log(`➕ Added to playlist: ${track}`);
  }

  /**
   * Adds multiple tracks to the playlist
   * @param tracks - Array of tracks to add
   */
  public addMultipleToPlaylist(tracks: ITrack[]): void {
    tracks.forEach(track => this.addToPlaylist(track));
  }

  /**
   * Adds a track to the queue (will play before continuing with playlist)
   * @param track - The track to add to queue
   */
  public addToQueue(track: ITrack): void {
    this.queue.append(track);
    console.log(`📋 Added to queue: ${track}`);
  }

  /**
   * Adds multiple tracks to the queue
   * @param tracks - Array of tracks to add to queue
   */
  public addMultipleToQueue(tracks: ITrack[]): void {
    tracks.forEach(track => this.addToQueue(track));
  }

  /**
   * Plays the next track according to the current mode and queue
   */
  public playNext(): void {
    let nextTrack: ITrack | null = null;

    // Priority 1: Check if there are queued tracks
    if (!this.queue.isEmpty()) {
      nextTrack = this.queue.removeAt(0);
      console.log('📋 Playing from queue');
    }
    // Priority 2: Check repeat mode for current track
    else if (this.repeatMode === RepeatMode.ONE && this.currentTrack) {
      nextTrack = this.currentTrack;
      console.log('🔂 Repeating current track');
    }
    // Priority 3: Get next track from playlist
    else if (!this.playlist.isEmpty()) {
      // In shuffle mode, rotate to a random position
      if (this.shuffleMode) {
        const randomRotation = Math.floor(Math.random() * this.playlist.size);
        this.playlist.rotate(randomRotation);
        console.log('🔀 Shuffle mode - random track selected');
      } else {
        this.playlist.rotate(1); // Move to next track
      }
      nextTrack = this.playlist.getCurrent() || null;
    }

    if (nextTrack) {
      this.playTrack(nextTrack);
    } else {
      console.log('⏹️ No more tracks to play');
      this.isPlaying = false;
    }
  }

  /**
   * Plays the previous track from recently played
   */
  public playPrevious(): void {
    if (this.recentlyPlayed.size >= 2) {
      // Remove current track from recently played if it's there
      if (this.recentlyPlayed.size > 0) {
        this.recentlyPlayed.removeLast();
      }
      // Get the previous track
      const previousTrack = this.recentlyPlayed.removeLast();
      console.log('⏮️ Playing previous track');
      this.playTrack(previousTrack);
    } else {
      console.log('❌ No previous track available');
    }
  }

  /**
   * Skips the current track and plays the next one
   */
  public skip(): void {
    console.log('⏭️ Skipping track');
    this.playNext();
  }

  /**
   * Toggles shuffle mode
   */
  public toggleShuffle(): void {
    this.shuffleMode = !this.shuffleMode;
    console.log(`🔀 Shuffle mode: ${this.shuffleMode ? 'ON' : 'OFF'}`);
  }

  /**
   * Cycles through repeat modes: none -> one -> all -> none
   */
  public toggleRepeat(): void {
    const modes = [RepeatMode.NONE, RepeatMode.ONE, RepeatMode.ALL];
    const currentIndex = modes.indexOf(this.repeatMode);
    this.repeatMode = modes[(currentIndex + 1) % modes.length];
    
    const modeSymbols = { 
      [RepeatMode.NONE]: '↻', 
      [RepeatMode.ONE]: '🔂', 
      [RepeatMode.ALL]: '🔁' 
    };
    console.log(`${modeSymbols[this.repeatMode]} Repeat mode: ${this.repeatMode.toUpperCase()}`);
  }

  /**
   * Shows the current queue
   */
  public showQueue(): void {
    console.log('\n📋 Current Queue:');
    if (this.queue.isEmpty()) {
      console.log('   Queue is empty');
    } else {
      const queueArray = this.queue.toArray();
      queueArray.forEach((track, index) => {
        console.log(`   ${index + 1}. ${track} (${track.formattedDuration})`);
      });
    }
    console.log(`   Total queued tracks: ${this.queue.size}\n`);
  }

  /**
   * Shows recently played tracks
   */
  public showRecentlyPlayed(): void {
    console.log('\n🕐 Recently Played:');
    if (this.recentlyPlayed.isEmpty()) {
      console.log('   No recently played tracks');
    } else {
      // Show most recent first
      const recentArray = this.recentlyPlayed.toArray().reverse();
      recentArray.forEach((track, index) => {
        const playTime = track.lastPlayed ? 
          track.lastPlayed.toLocaleTimeString() : 'Unknown';
        console.log(`   ${index + 1}. ${track} (played at ${playTime}) [${track.playCount} plays]`);
      });
    }
    console.log(`   Total recently played: ${this.recentlyPlayed.size}\n`);
  }

  /**
   * Shows the current playlist
   */
  public showPlaylist(): void {
    console.log('\n🎵 Current Playlist:');
    if (this.playlist.isEmpty()) {
      console.log('   Playlist is empty');
    } else {
      const playlistArray = this.playlist.toArray();
      playlistArray.forEach((track, index) => {
        const isCurrent = track === this.currentTrack ? '▶️ ' : '   ';
        const qualityBadge = track.quality === AudioQuality.LOSSLESS ? ' 🎧' : '';
        console.log(`${isCurrent}${index + 1}. ${track} (${track.formattedDuration})${qualityBadge}`);
      });
    }
    console.log(`   Total tracks: ${this.playlist.size}\n`);
  }

  /**
   * Shows the current player status
   */
  public showStatus(): void {
    console.log('\n🎵 Media Player Status:');
    console.log(`   Current Track: ${this.currentTrack ? this.currentTrack : 'None'}`);
    console.log(`   Playing: ${this.isPlaying ? 'Yes' : 'No'}`);
    console.log(`   Shuffle: ${this.shuffleMode ? 'ON' : 'OFF'}`);
    console.log(`   Repeat: ${this.repeatMode.toUpperCase()}`);
    console.log(`   Playlist Size: ${this.playlist.size}`);
    console.log(`   Queue Size: ${this.queue.size}`);
    console.log(`   Recently Played: ${this.recentlyPlayed.size}\n`);
  }

  /**
   * Creates a playlist of favorite tracks
   */
  public createFavoritesPlaylist(): CircularLinkedList<ITrack> {
    const favorites = new CircularLinkedList<ITrack>();
    this.playlist.forEach((track) => {
      if (track.isFavorite) {
        favorites.append(track);
      }
    });
    return favorites;
  }

  /**
   * Gets tracks by a specific artist
   */
  public getTracksByArtist(artist: string): ITrack[] {
    const artistTracks: ITrack[] = [];
    this.playlist.forEach((track) => {
      if (track.artist.toLowerCase().includes(artist.toLowerCase())) {
        artistTracks.push(track);
      }
    });
    return artistTracks;
  }

  /**
   * Searches for tracks by title or artist
   */
  public searchTracks(query: string): ITrack[] {
    const results: ITrack[] = [];
    const lowerQuery = query.toLowerCase();
    
    this.playlist.forEach((track) => {
      if (track.title.toLowerCase().includes(lowerQuery) || 
          track.artist.toLowerCase().includes(lowerQuery) ||
          (track.album && track.album.toLowerCase().includes(lowerQuery))) {
        results.push(track);
      }
    });
    
    return results;
  }

  /**
   * Sorts playlist by different criteria
   */
  public sortPlaylistBy(criteria: 'title' | 'artist' | 'duration' | 'playCount'): void {
    const tracks = this.playlist.toArray();
    
    tracks.sort((a, b) => {
      switch (criteria) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'artist':
          return a.artist.localeCompare(b.artist);
        case 'duration':
          return a.duration - b.duration;
        case 'playCount':
          return b.playCount - a.playCount; // Descending order
        default:
          return 0;
      }
    });
    
    this.playlist.clear();
    tracks.forEach(track => this.playlist.append(track));
    console.log(`📊 Playlist sorted by ${criteria}`);
  }

  /**
   * Clears all player data
   */
  public reset(): void {
    this.playlist.clear();
    this.queue.clear();
    this.recentlyPlayed.clear();
    this.currentTrack = null;
    this.isPlaying = false;
    this.shuffleMode = false;
    this.repeatMode = RepeatMode.NONE;
    console.log('🔄 Media player reset');
  }

  /**
   * Gets comprehensive player statistics
   */
  public getStats(): IPlayerStats {
    const playlistArray = this.playlist.toArray();
    const totalDuration = playlistArray.reduce((sum, track) => sum + track.duration, 0);
    const totalPlays = playlistArray.reduce((sum, track) => sum + track.playCount, 0);
    const favoriteTracksCount = playlistArray.filter(track => track.isFavorite).length;
    
    const mostPlayedTrack = playlistArray.reduce((max, track) => 
      track.playCount > max.playCount ? track : max, 
      playlistArray[0] || { playCount: 0, title: 'None' });

    const averageTrackDuration = playlistArray.length > 0 ? totalDuration / playlistArray.length : 0;

    return {
      totalTracks: this.playlist.size,
      totalDuration: totalDuration,
      formattedTotalDuration: this.formatDuration(totalDuration),
      totalPlays: totalPlays,
      mostPlayedTrack: mostPlayedTrack.title,
      averageTrackDuration: Math.round(averageTrackDuration),
      favoriteTracksCount: favoriteTracksCount
    };
  }

  // Private helper methods

  /**
   * Internal method to play a track and update recently played
   */
  private playTrack(track: ITrack): void {
    // Add current track to recently played before switching
    if (this.currentTrack) {
      this.addToRecentlyPlayed(this.currentTrack);
    }

    this.currentTrack = track;
    this.isPlaying = true;
    track.play();
  }

  /**
   * Adds a track to the recently played list
   */
  private addToRecentlyPlayed(track: ITrack): void {
    // Remove the track if it's already in recently played
    const existingIndex = this.recentlyPlayed.indexOf(track);
    if (existingIndex !== -1) {
      this.recentlyPlayed.removeAt(existingIndex);
    }

    // Add to the end (most recent)
    this.recentlyPlayed.append(track);

    // Maintain max size by removing oldest
    while (this.recentlyPlayed.size > this.maxRecentlyPlayed) {
      this.recentlyPlayed.removeAt(0);
    }
  }

  /**
   * Formats duration from seconds to human-readable format
   */
  private formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  }
}

// Example usage and demonstration
if (require.main === module) {
  console.log('=== TypeScript MediaPlayer Implementation Demo ===\n');

  // Create sample tracks with different qualities and properties
  const tracks: ITrack[] = [
    new Track('track1', 'Bohemian Rhapsody', 'Queen', 355, '/music/queen/bohemian_rhapsody.flac', AudioQuality.LOSSLESS, 'A Night at the Opera'),
    new Track('track2', 'Hotel California', 'Eagles', 391, '/music/eagles/hotel_california.mp3', AudioQuality.HIGH, 'Hotel California'),
    new Track('track3', 'Imagine', 'John Lennon', 183, '/music/lennon/imagine.mp3', AudioQuality.MEDIUM, 'Imagine'),
    new Track('track4', 'Billie Jean', 'Michael Jackson', 294, '/music/mj/billie_jean.mp3', AudioQuality.HIGH, 'Thriller'),
    new Track('track5', 'Sweet Child O Mine', 'Guns N Roses', 356, '/music/gnr/sweet_child.mp3', AudioQuality.MEDIUM, 'Appetite for Destruction'),
  ];

  // Create media player instance
  const player = new MediaPlayer();

  console.log('1. Building a playlist with typed tracks');
  player.addMultipleToPlaylist(tracks);

  console.log('\n2. Setting some tracks as favorites');
  tracks[0].toggleFavorite(); // Bohemian Rhapsody
  tracks[3].toggleFavorite(); // Billie Jean

  console.log('\n3. Initial player status');
  player.showStatus();

  console.log('4. Playing through several tracks');
  player.playNext(); // First track
  console.log('');
  player.playNext(); // Second track
  console.log('');
  player.playNext(); // Third track
  console.log('');

  console.log('5. Adding tracks to queue with type safety');
  player.addToQueue(tracks[4]); // Sweet Child O Mine
  player.addToQueue(tracks[0]); // Bohemian Rhapsody
  player.showQueue();

  console.log('6. Testing search functionality');
  const queenTracks = player.getTracksByArtist('Queen');
  console.log(`   Found ${queenTracks.length} Queen tracks: ${queenTracks.map(t => t.title).join(', ')}`);
  
  const searchResults = player.searchTracks('hotel');
  console.log(`   Search for 'hotel': ${searchResults.map(t => t.title).join(', ')}\n`);

  console.log('7. Playing queued tracks');
  player.playNext(); // From queue
  console.log('');
  player.playNext(); // From queue
  console.log('');

  console.log('8. Checking recently played with type information');
  player.showRecentlyPlayed();

  console.log('9. Testing repeat functionality');
  player.toggleRepeat(); // Should be RepeatMode.ONE
  console.log('Playing next (should repeat current):');
  player.playNext();
  console.log('');

  player.toggleRepeat(); // Should be RepeatMode.ALL
  player.toggleRepeat(); // Should be RepeatMode.NONE

  console.log('10. Testing shuffle with strong typing');
  player.toggleShuffle();
  console.log('Playing next few tracks with shuffle:');
  for (let i = 0; i < 3; i++) {
    player.playNext();
    console.log('');
  }

  console.log('11. Sorting playlist');
  player.sortPlaylistBy('duration');
  player.showPlaylist();

  console.log('12. Creating favorites playlist');
  const favorites = player.createFavoritesPlaylist();
  console.log(`   Favorites playlist created with ${favorites.size} tracks`);
  console.log(`   Favorites: ${favorites.toArray().map(t => t.title).join(', ')}\n`);

  console.log('13. Comprehensive statistics');
  const stats = player.getStats();
  console.log('📊 Player Statistics:');
  console.log(`   Total tracks: ${stats.totalTracks}`);
  console.log(`   Total duration: ${stats.formattedTotalDuration}`);
  console.log(`   Total plays: ${stats.totalPlays}`);
  console.log(`   Most played: ${stats.mostPlayedTrack}`);
  console.log(`   Average track duration: ${Math.floor(stats.averageTrackDuration / 60)}:${(stats.averageTrackDuration % 60).toString().padStart(2, '0')}`);
  console.log(`   Favorite tracks: ${stats.favoriteTracksCount}\n`);

  console.log('14. Type safety demonstration');
  console.log('   All operations are type-safe at compile time!');
  console.log('   - Tracks must implement ITrack interface');
  console.log('   - Player methods have proper return types');
  console.log('   - Enums prevent invalid states');
  console.log('   - Generic linked lists ensure type consistency\n');

  console.log('15. Testing error handling');
  try {
    const emptyPlayer = new MediaPlayer();
    emptyPlayer.playPrevious(); // Should handle gracefully
  } catch (error) {
    console.log(`   Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}