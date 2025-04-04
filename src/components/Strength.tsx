function Strength() {
    return (
        <div>
            <fieldset>
                <legend>Strength</legend>
                <label>                    
                    <input type="radio" name="strength" value={18}/>weak
                </label>
                <label>                    
                    <input type="radio" name="strength" value={17}/>mild
                </label>
                <label>                    
                    <input type="radio" name="strength" value={16}/>average
                </label>
                <label>                    
                    <input type="radio" name="strength" value={15}/>strong
                </label>
                <label>                    
                    <input type="radio" name="strength" value={14}/>robust
                </label>
            </fieldset>
        </div>
    )
}

export default Strength