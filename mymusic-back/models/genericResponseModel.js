exports.genericResponse = function(success,message,code,data,token){
    const response = {
        success,
        message,
        code,
        data,
        token
    }
    return response;
}

exports.genericRes = {
    success:false,
    message:'',
    code:-1
}
