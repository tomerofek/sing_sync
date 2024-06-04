import { RoomController } from './RoomController';

// Decode function using Base64 decoding
function decodeWithBase64(encodedText: string): string {
  return Buffer.from(encodedText, 'base64').toString('utf8');
}

describe('RoomController', () => {
  let roomController: RoomController;

  beforeEach(() => {
    // Initialize RoomController before each test
    roomController = new RoomController();
  });

  it('should host a room', async () => {
    // Arrange
    const roomData = {
      name: 'Test Room',
      // Add other room properties here
    };
    const expectedRoomId = roomController.next_id[0];

    // Act
    let acturalRoomId = await roomController.hostRoom(roomData);
    acturalRoomId = decodeWithBase64(acturalRoomId);
    const parts: string[] = acturalRoomId.split("|");
    const acturalRoomIdNumber = parseInt(acturalRoomId, 10);

    // Assert
    expect(acturalRoomIdNumber).toBeDefined();
    expect(acturalRoomIdNumber).toBe(expectedRoomId);
     
  });

  it('should generate unique room ID', async () => {
    // Arrange
    const roomData = {
      name: 'Test Room',
      // Add other room properties here
    };

    // Act
    const roomId1 = await roomController.hostRoom(roomData);
    const roomId2 = await roomController.hostRoom(roomData);

    // Assert
    expect(roomId1).not.toBe(roomId2);
     
  });

  it('should join a room', async () => {
    // Arrange
    const roomData = {
      name: 'Test Room',
      // Add other room properties here
    };
    let roomId = await roomController.hostRoom(roomData);
   

    // Act
    const result = roomController.joinRoom(roomId);

    // Assert
    expect(result).toBe(true);
     
  });

  it('fails to join a room with invalid ID', () => {
    // Arrange
    const invalidRoomId = 'invalid-room-id';

    // Act & Assert
    expect(() => roomController.joinRoom(invalidRoomId)).toThrowError('Invalid ID');
  });

  it('should get current position in the song', async () => {
    // Arrange
    const roomData = {
      name: 'Test Room',
      // Add other room properties here
    };
    let roomId = roomController.hostRoom(roomData);
    roomId = decodeWithBase64(roomId);
    const parts: string[] = roomId.split("|");
    roomId = parts[0];
  
    // add song to the room
    const songData = {
      name: ' (פסח) מה נשתנה',
      athuor: 'חגים ומועדים',
      // Add other song properties here
    };
    // add song to the queue 
    try {
      await roomController.add_song_to_queue(roomId, songData.name,songData.athuor);
      // wait for the song to be added
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Act
      roomController.get_current_position(roomId);

      // next position in the song
      const expect_position =roomController.advance_position(roomId);

      const position = roomController.get_current_position(roomId);
  
      // Assert
      expect(position).toBeDefined();
      expect(position).toBe(expect_position);
    } catch (error) {
      throw new Error('An error occurred while processing the data');
    }
     
  });

  it('fails to get current position in the song with invalid ID', () => {
    // Arrange
    const invalidRoomId = 'invalid-room-id';

    // Act & Assert
    expect(() => roomController.get_current_position(invalidRoomId)).toThrowError('Invalid ID');
  });

  it('should get current song', async () => {
    // Arrange
    const roomData = {
      name: 'Test Room',
      // Add other room properties here
    };
    let roomId = roomController.hostRoom(roomData);
    roomId = decodeWithBase64(roomId);
    const parts: string[] = roomId.split("|");
    roomId = parts[0];
  
    // add song to the room
    const songData = {
      name: ' (פסח) מה נשתנה',
      athuor: 'חגים ומועדים',
      // Add other song properties here
    };
    // add song to the queue 
    try {
      await roomController.add_song_to_queue(roomId, songData.name,songData.athuor);
      // wait for the song to be added
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Act
      const song_info = roomController.get_current_song(roomId);
  
      // Assert
      expect(song_info).toBeDefined();
      expect(song_info?.song_author).toBe(songData.athuor);
      expect(song_info?.song_name).toBe(songData.name);

    } catch (error) {
      throw new Error('An error occurred while processing the data');
    }
     
  });

  it('fails to get current song with invalid ID', () => {
    // Arrange
    const invalidRoomId = 'invalid-room-id';

    // Act & Assert
    expect(() => roomController.get_current_song(invalidRoomId)).toThrowError('Invalid ID');
  });

  it('advance_position in the song', async () => {
    // Arrange
    const roomData = {
      name: 'Test Room',
      // Add other room properties here
    };
    let roomId = roomController.hostRoom(roomData);
    roomId = decodeWithBase64(roomId);
    const parts: string[] = roomId.split("|");
    roomId = parts[0];

    // add song to the room
    const songData = {
      name: ' (פסח) מה נשתנה',
      athuor: 'חגים ומועדים',
      // Add other song properties here
    };
    // add song to the queue 
    try {
      await roomController.add_song_to_queue(roomId, songData.name,songData.athuor);
      // wait for the song to be added
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Act
      const position_1 = roomController.advance_position(roomId);
      const position_2 = roomController.advance_position(roomId);
  
      // Assert
      expect(position_1).toBeDefined();
      expect(position_1).toBe(1);

      expect(position_2).toBeDefined();
      expect(position_2).toBe(2);


    } catch (error) {
      throw new Error('An error occurred while processing the data');
    }
     
  });

  it('fails to advance_position in the song with invalid ID', () => {
    // Arrange
    const invalidRoomId = 'invalid-room-id';

    // Act & Assert
    expect(() => roomController.advance_position(invalidRoomId)).toThrowError('Invalid ID');
  });

  it('previous_position in the song', async () => {
    // Arrange
    const roomData = {
      name: 'Test Room',
      // Add other room properties here
    };
    let roomId = roomController.hostRoom(roomData);
    roomId = decodeWithBase64(roomId);
    const parts: string[] = roomId.split("|");
    roomId = parts[0];
  
    // add song to the room
    const songData = {
      name: ' (פסח) מה נשתנה',
      athuor: 'חגים ומועדים',
      // Add other song properties here
    };
    // add song to the queue 
    try {
      await roomController.add_song_to_queue(roomId, songData.name,songData.athuor);
      // wait for the song to be added
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Act
      const position_1 = roomController.advance_position(roomId);
      const position_2 = roomController.previous_position(roomId);
  
      // Assert
      expect(position_1).toBeDefined();
      expect(position_1).toBe(1);

      expect(position_2).toBeDefined();
      expect(position_2).toBe(0);

    } catch (error) {
      throw new Error('An error occurred while processing the data');
    }
     
  });
  
  it('fails to previous_position in the song with invalid ID', () => {
    // Arrange
    const invalidRoomId = 'invalid-room-id';

    // Act & Assert
    expect(() => roomController.previous_position(invalidRoomId)).toThrowError('Invalid ID');
  });

  it('advance_song in the song', async () => {
    // Arrange
    const roomData = {
      name: 'Test Room',
      // Add other room properties here
    };
    let roomId = roomController.hostRoom(roomData);
    roomId = decodeWithBase64(roomId);
    const parts: string[] = roomId.split("|");
    roomId = parts[0];
    // add song to the room
    const songData_1 = {
      name: ' (פסח) מה נשתנה',
      athuor: 'חגים ומועדים',
      // Add other song properties here
    };
    const songData_2 = {
      name: 'אדון שוקו',
      athuor: 'אריק איינשטיין',
      // Add other song properties here
    };

    // add song to the queue 
    try {
      await roomController.add_song_to_queue(roomId, songData_1.name,songData_1.athuor);
      // wait for the song to be added
      await new Promise((resolve) => setTimeout(resolve, 2000));

      await roomController.add_song_to_queue(roomId, songData_2.name,songData_2.athuor);
      // wait for the song to be added
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Act
      const song_2 = roomController.advance_song(roomId);
  
      // Assert
      expect(song_2).toBeDefined();
      expect(song_2?.song_author).toBe(songData_2.athuor);
      expect(song_2?.song_name).toBe(songData_2.name);

    } catch (error) {
      throw new Error('An error occurred while processing the data');
    }
     
  },200000);

  it('fails to advance_song in the song with invalid ID', () => {
    // Arrange
    const invalidRoomId = 'invalid-room-id';

    // Act & Assert
    expect(() => roomController.advance_song(invalidRoomId)).toThrowError('Invalid ID');
  });


  it('get_top_queue in the song', async () => {
    // Arrange
    const roomData = {
      name: 'Test Room',
      // Add other room properties here
    };
    let roomId = roomController.hostRoom(roomData);
    roomId = decodeWithBase64(roomId);
    const parts: string[] = roomId.split("|");
    roomId = parts[0];
  
    // add song to the room
    const songData_1 = {
      name: ' (פסח) מה נשתנה',
      athuor: 'חגים ומועדים',
      // Add other song properties here
    };
    const songData_2 = {
      name: 'אדון שוקו',
      athuor: 'אריק איינשטיין',
      // Add other song properties here
    };

    // add song to the queue 
    try {
      await roomController.add_song_to_queue(roomId, songData_1.name,songData_1.athuor);
      // wait for the song to be added
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await roomController.add_song_to_queue(roomId, songData_2.name,songData_2.athuor);
      // wait for the song to be added
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Act
      const top_queue = roomController.get_top_queue(roomId);
  
     // Assert
      expect(top_queue).toBeDefined();
      if (top_queue) {
        expect(top_queue[0].song_author).toBe(songData_2.athuor);
        expect(top_queue[0].song_name).toBe(songData_2.name);
      } else {
        throw new Error('top_queue is undefined');
      }
    } catch (error) {
      throw new Error('An error occurred while processing the data');
    }
     
  },200000);

  it('fails to get_top_queue in the song with invalid ID', () => {
    // Arrange
    const invalidRoomId = 'invalid-room-id';

    // Act & Assert
    expect(() => roomController.get_top_queue(invalidRoomId)).toThrowError('Invalid ID');
  });

  it('get_all_queue in the song', async () => {
    // Arrange
    const roomData = {
      name: 'Test Room',
      // Add other room properties here
    };
    let roomId = roomController.hostRoom(roomData);
    roomId = decodeWithBase64(roomId);
    const parts: string[] = roomId.split("|");
    roomId = parts[0];
  
    // add song to the room
    const songData_1 = {
      name: ' (פסח) מה נשתנה',
      athuor: 'חגים ומועדים',
      // Add other song properties here
    };
    const songData_2 = {
      name: 'אדון שוקו',
      athuor: 'אריק איינשטיין',
      // Add other song properties here
    };

    // add song to the queue 
    try {
      await roomController.add_song_to_queue(roomId, songData_1.name,songData_1.athuor);
      // wait for the song to be added
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await roomController.add_song_to_queue(roomId, songData_2.name,songData_2.athuor);
      // wait for the song to be added
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Act
      const all_queue = roomController.get_all_queue(roomId);
  
     // Assert
      expect(all_queue).toBeDefined();
      if (all_queue) {
        expect(all_queue[0].song_author).toBe(songData_1.athuor);
        expect(all_queue[0].song_name).toBe(songData_1.name);
        expect(all_queue[1].song_author).toBe(songData_2.athuor);
        expect(all_queue[1].song_name).toBe(songData_2.name);
      } else {
        throw new Error('all_queue is undefined');
      }
    } catch (error) {
      throw new Error('An error occurred while processing the data');
    }
     
  },200000);

  it('fails to get_all_queue in the song with invalid ID', () => {
    // Arrange
    const invalidRoomId = 'invalid-room-id';

    // Act & Assert
    expect(() => roomController.get_all_queue(invalidRoomId)).toThrowError('Invalid ID');
  });

  it('remove_song_from_queue in the song', async () => {
    // Arrange
    const roomData = {
      name: 'Test Room',
      // Add other room properties here
    };
    let roomId = roomController.hostRoom(roomData);
    roomId = decodeWithBase64(roomId);
    const parts: string[] = roomId.split("|");
    roomId = parts[0];
  
    // add song to the room
    const songData_1 = {
      name: ' (פסח) מה נשתנה',
      athuor: 'חגים ומועדים',
      // Add other song properties here
    };
    const songData_2 = {
      name: 'אדון שוקו',
      athuor: 'אריק איינשטיין',
      // Add other song properties here
    };

    // add song to the queue 
    try {
      await roomController.add_song_to_queue(roomId, songData_1.name,songData_1.athuor);
      // wait for the song to be added
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await roomController.add_song_to_queue(roomId, songData_2.name,songData_2.athuor);
      // wait for the song to be added
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Act
      roomController.remove_song_from_queue(roomId,0);
      const all_queue = roomController.get_all_queue(roomId);
  
     // Assert
      expect(all_queue).toBeDefined();
      if (all_queue) {
        expect(all_queue[0].song_author).toBe(songData_2.athuor);
        expect(all_queue[0].song_name).toBe(songData_2.name);
        expect(all_queue.length).toBe(1);
      } else {
        throw new Error('all_queue is undefined');
      }
    } catch (error) {
      throw new Error('An error occurred while processing the data');
    }
     
  },200000);

  it('fails to remove_song_from_queue in the song with invalid ID', () => {
    // Arrange
    const invalidRoomId = 'invalid-room-id';

    // Act & Assert
    expect(() => roomController.remove_song_from_queue(invalidRoomId,0)).toThrowError('Invalid ID');
  });

  it('search_song_from_db in the song', async () => {
    // Arrange
    const song_name = ' (פסח) מה נשתנה';
    const song_author = 'חגים ומועדים';
  
    // Act
    const result = await roomController.search_song_from_db(song_name,song_author);
    // wait for the song to be searched
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Assert
    expect(result).toBeDefined();
    expect(result[0].song_author).toBe(song_author);
    expect(result[0].song_name).toBe(song_name);
     
  });

  it('add_song_to_queue in the song', async () => {
    // Arrange
    const roomData = {
      name: 'Test Room',
      // Add other room properties here
    };
    let roomId = roomController.hostRoom(roomData);
    roomId = decodeWithBase64(roomId);
    const parts: string[] = roomId.split("|");
    roomId = parts[0];
  
    const song_name = ' (פסח) מה נשתנה';
    const song_author = 'חגים ומועדים';
  
    // Act
    await roomController.add_song_to_queue(roomId, song_name,song_author);
    // wait for the song to be added
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Assert
    const all_queue = roomController.get_all_queue(roomId);
    expect(all_queue).toBeDefined();
    if (all_queue) {
      expect(all_queue[0].song_author).toBe(song_author);
      expect(all_queue[0].song_name).toBe(song_name);
    } else {
      throw new Error('all_queue is undefined');
    }
     
  });

  it('fails to add_song_to_queue in the song with invalid ID', () => {
    // Arrange
    const invalidRoomId = 'invalid-room-id';
    const song_name = ' (פסח) מה נשתנה';
    const song_author = 'חגים ומועדים';

    // Act & Assert
    expect(() => roomController.add_song_to_queue(invalidRoomId, song_name,song_author)).toThrowError('Room doesn\'t exist');
  });

  it('get_song_from_url in the song', async () => {
    // Arrange
    const roomData = {
      name: 'Test Room',
      // Add other room properties here
    };
    let roomId = roomController.hostRoom(roomData);
    roomId = decodeWithBase64(roomId);
    const parts: string[] = roomId.split("|");
    roomId = parts[0];
  
    const url = 'https://www.nagnu.co.il/%D7%90%D7%A7%D7%95%D7%A8%D7%93%D7%99%D7%9D/%D7%97%D7%92%D7%99%D7%9D_%D7%95%D7%9E%D7%95%D7%A2%D7%93%D7%99%D7%9D/(%D7%A4%D7%A1%D7%97)_%D7%A9%D7%9E%D7%97%D7%94_%D7%A8%D7%91%D7%94';

    const song_name = '(פסח) שמחה רבה';
    const song_author = 'חגים ומועדים';
  
    // Act
    const result = await roomController.get_song_from_url(roomId, url);
    // wait for the song to be added
    await new Promise((resolve) => setTimeout(resolve, 10000));

    // Assert
    expect(result).toBeDefined();
    expect(result.song_author).toBe(song_author);
    expect(result.song_name).toBe(song_name);
     
  },200000);

  it('fails to get_song_from_url in the song with invalid ID', () => {
    // Arrange
    const invalidRoomId = 'invalid-room-id';
    const url = 'https://www.nagnu.co.il/%D7%90%D7%A7%D7%95%D7%A8%D7%93%D7%99%D7%9D/%D7%97%D7%92%D7%99%D7%9D_%D7%95%D7%9E%D7%95%D7%A2%D7%93%D7%99%D7%9D/(%D7%A4%D7%A1%D7%97)_%D7%A9%D7%9E%D7%97%D7%94_%D7%A8%D7%91%D7%94';

    // Act & Assert
    expect(() => roomController.get_song_from_url(invalidRoomId, url)).toThrowError('Room doesn\'t exist');
  });

  it('get_queue_len in the song', async () => {
    // Arrange
    const roomData = {
      name: 'Test Room',
      // Add other room properties here
    };
    let roomId = roomController.hostRoom(roomData);
    roomId = decodeWithBase64(roomId);
    const parts: string[] = roomId.split("|");
    roomId = parts[0];
  
    const song_name = ' (פסח) מה נשתנה';
    const song_author = 'חגים ומועדים';
  
    // Act
    await roomController.add_song_to_queue(roomId, song_name,song_author);
    // wait for the song to be added
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Assert
    const queue_len = roomController.get_queue_len(roomId);
    expect(queue_len).toBeDefined();
    expect(queue_len).toBe(1);
     
  });
  
  it('fails to get_queue_len in the song with invalid ID', () => {
    // Arrange
    const invalidRoomId = 'invalid-room-id';

    // Act & Assert
    expect(() => roomController.get_queue_len(invalidRoomId)).toThrowError('Invalid ID');
  });


  // Add more tests here for other RoomController methods
});


