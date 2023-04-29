package com.stefanini.dto.jogador;

import com.stefanini.dto.stefamon.StefamonDTO;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.List;

public class JogadorCriacaoDTO {

    @NotBlank(message = "Nickname não pode ser vazio.")
    private String nickname;

    @NotBlank(message = "Senha não pode estar vazia.")
    @Size(min = 4, max = 10, message = "A senha deve ter entre 4 e 10 caracteres.")
    private String password;

    public JogadorCriacaoDTO(){}

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
