const fs = require('fs');
class loggerProvider {

    constructor(filepath) {
        this.path = filepath;
        this.fs = fs;
        this.IDGenerator = require('shortid');
        this.logs = [];
        (async () => {
            this.logs = this.readAsJson();
        })().catch(e => {
            console.log(e)
        })
    }

    readAsJson() {
        try {
            return JSON.parse(this.fs.readFileSync(this.path, 'utf8'));
        } catch (e) {
            console.log(e)
        }
    }

    addRecord({
        timestamp,
        message,
        name,
        stack
    }) {
        try {
            const unqiueId = this.IDGenerator.generate();
            const newLog = this.logs.push({
                id: unqiueId,
                timestamp: Date.now(),
                message,
                name,
                stack
            })
            this.save();
            return this.logs[newLog - 1];
        } catch (e) {
            console.log(e)
        }
    }

    deleteRecord({
        id
    }) {
        this.logs.forEach((record, index) => {
            if (record.id && record.id === id) {
                this.logs.splice(index, 1)
            }
        });
        this.save();
    }

    save() {
        try {
            const fd = this.fs.openSync(this.path);
            this.fs.writeFileSync(this.path, JSON.stringify(this.logs), {
                encoding: "utf8",
            })
            this.fs.closeSync(fd);
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = (fileLogPath) => {
    return new loggerProvider(fileLogPath);
}