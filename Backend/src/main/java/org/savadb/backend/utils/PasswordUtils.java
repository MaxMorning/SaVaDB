package org.savadb.backend.utils;

import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.PBEKeySpec;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.security.spec.KeySpec;

public class PasswordUtils {
    public static byte[] genRandom512bit() {
        // gen salt
        byte[] salt = new byte[64];
        try {
            SecureRandom secureRandom = SecureRandom.getInstance("SHA1PRNG");
            secureRandom.nextBytes(salt);
        }
        catch (Exception e) {
            e.printStackTrace();
        }

        return salt;
    }

    public static byte[] passwordHash(byte[] password, byte[] salt) {
        byte[] hashedPassword = new byte[64];
        try {
            KeySpec keySpec = new PBEKeySpec(getChars(password), salt, 1000, 512);
            SecretKeyFactory secretKeyFactory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
            hashedPassword = secretKeyFactory.generateSecret(keySpec).getEncoded();
        }
        catch (Exception e) {
            e.printStackTrace();
        }

        return hashedPassword;
    }

    public static char[] getChars(byte[] bytes) {
        Charset charset = StandardCharsets.UTF_8;
        ByteBuffer byteBuffer = ByteBuffer.allocate(bytes.length);
        byteBuffer.put(bytes).flip();
        CharBuffer charBuffer = charset.decode(byteBuffer);
        return charBuffer.array();
    }
}
