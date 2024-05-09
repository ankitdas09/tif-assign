class Env {
    static names = [
        "PORT",
        "MONGO_URI",
    ]
    static variable: Record<typeof Env.names[number], string>
    
    static Loader(){
        const values : Record<string, string> = {}
        for(const key of Env.names){
            const value = process.env[key]
            if(!value){
                console.error(`Env value missing for key: ${key}`)
                continue;
            }
            values[key] = value
        }
        this.variable = values
    }
}

export default Env