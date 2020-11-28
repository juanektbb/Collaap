import LoginController from 'Collaap/src/utils/LoginController'

export default async (is_first_call, response_code, method_to_rerun, options = null) => {

    //If it is the first call, and the server responds with wrong 
    if(is_first_call === true){
        if(response_code === 401){

            //Persist the session and get a new one
            const loginController = new LoginController()
            const restart_session = await loginController.ObtainSessionToken()

            //Session was nicely given
            if(restart_session === true){

                //Act according to the options
                if(options === null)
                    return await method_to_rerun(false)
                else if(options.id)
                    return await method_to_rerun(options.id, false)

            }
        }else{
            false
        }
    }else{
        return false
    }

}