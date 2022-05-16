package org.savadb.backend.utils;

public class Result<T> {

    private Integer code;
    private String msg;
    private T data;

    public Result() {
    }

    public Result(Integer code, String msg) {
        this.code = code;
        this.msg = msg;
        this.data = null;
    }

    public Result(Integer code, String msg, T data) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }

    public static <T> Result<T> resultFactory(EResult eResult, T data) {
        if (eResult == null) {
            return new Result<>();
        } else if (data == null) {
            return new Result<>(eResult.getCode(), eResult.getMsg());
        } else {
            return new Result<>(eResult.getCode(), eResult.getMsg(), data);
        }
    }

    public static <T> Result<T> success(T data) {
        return new Result<>(EResult.SUCCESS.getCode(),
                EResult.SUCCESS.getMsg(), data);
    }

    public static <T> Result<T> failed(EResult res) {
        return new Result<T>(res.getCode(), res.getMsg(), null);
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "Result{" +
                "code=" + code +
                ", msg='" + msg + '\'' +
                ", data=" + data +
                '}';
    }
}
