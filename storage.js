const Storage = {
    save(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    },
  
    load(key, defaultValue = null) {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    },
  
    remove(key) {
      localStorage.removeItem(key);
    }
  };
  
  // Usage examples:
  // Storage.save("fokus_notes", notes);
  // let savedNotes = Storage.load("fokus_notes", []);
  // Storage.remove("fokus_notes");
  