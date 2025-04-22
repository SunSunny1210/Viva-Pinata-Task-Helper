<script setup>
const props = defineProps({
    option: String
})
</script>

<template>
    <div class="pop-up">
        <div class="change-option">
            <h2>{{ props.option }}</h2>
            <p>Choose your new {{ props.option.slice(7) }} :3</p>
            <form class="change-info">
                <label :for="props.option.slice(7)">New {{ props.option.slice(7) }}</label>
                <input 
                type="text" 
                :name="props.option === 'Change Username' ? 'username' : 'farm_name'" 
                :id="props.option.slice(7)"
                :placeholder="'Enter new ' + props.option.slice(7)">
                <button type="submit">Submit</button>
            </form>
        </div>
    </div>
</template>

<style scoped>
.pop-up {
    position: fixed;
    height: 60%;
    width: 80%;
    background-color: cornsilk;
    border-radius: 12px;
    box-shadow: 0 0 5px 2000px rgba(0, 0, 0, 0.4);
    z-index: 7;

    .change-option {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow-y: scroll;
        
        h2 {
            margin: 0;
            height: 20%;
            min-height: 60px;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            background-color: var(--medium-green);
            border-radius: 12px 12px 0 0;
        }

        p {
            margin: 1.5rem;
            padding: 10px;
            text-align: center;
            background-color: var(--white-yellow);
            border: 3px dashed var(--carmin);
            border-radius: 5px;
        }
    
        form {
            height: 100%;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            
            label {
                margin: 1rem;
                font-size: 1.5rem;
                color: var(--dark-green);
                border-radius: 12px;
            }
    
            input {
                margin: 1rem;
                padding: 10px;
                height: 2rem;
                width: 80%;
                border: 3px dashed orange;
                border-radius: 5px;
            }
            
            ::placeholder {
                color: darkolivegreen;
            }
            
            button {
                margin-bottom: 2rem;
                height: 4rem;
                width: 80%;
                color: white;
                font-size: 1rem;
                background-color: var(--carmin);
                border: none;
                border-radius: 12px;
            }
        }
    }
}
</style>